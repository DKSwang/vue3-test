<template>
  <div class="tags-container">
    <div class="tags-list-container" @mousewheel="onmousewheel">
      <span :class="['elleft']" @click="handleScroll(120)">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span :class="['elright']" @click="handleScroll(-120)">
        <i class="el-icon-arrow-right"></i>
      </span>
      <div class="tags-list-wrapper" ref="list-container">
        <transition name="bounce" mode="in-out">
          <ul class="tags-list" ref="tags-container">
            <li class="tags-item" v-for="(item,index) in tags" :key="index">
              <div v-bind:class="newR.fullPath==item.path?['select-item tags-item-button']:['tags-item-button']" @click="handelOnclik(item,index)">
                {{item.title}}
                <span @click.prevent="deleteTag(item,$event)" style="padding:0 5px" v-if="item.title!='首页'">
                  <i class="el-icon-close"></i>
                </span>
              </div>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script >
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
  toRef,
  getCurrentInstance //就是当前实例
} from "vue";
import { useStore } from "vuex";
import { useRouter, onBeforeRouteUpdate, useRoute } from "vue-router";
import { Base64 } from "js-base64";
import md5 from "md5";
export default {
  name: "Tags",
  setup(props, { refs, root }) {
    //实例化
    const { ctx } = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const newR = useRoute()
    console.log(newR, "newR")
    //定义变量
    const tags = ref(null);
    const isShow = ref(false);
    const translatePosition = ref(0);
    const homeTag = reactive({
      homeTags: [
        {
          title: "首页",
          name: "home",
          path: "/home"
        }
      ]
    });
    //定义函数
    const onmousewheel = e => {
      e.preventDefault();
      if (e.wheelDelta > 0) {
        //鼠标向上滑动
        ctx.handleScroll(+30);
      } else if (e.wheelDelta < 0) {
        //鼠标向下滑动
        ctx.handleScroll(-30);
      }
    };
    const handleScroll = offset => {
      //tags-list
      let targetEl = ctx.$refs["tags-container"];
      //tags-list.offsetWidth
      var targetElWidth = targetEl["offsetWidth"];
      var containerWidth = ctx.$refs["list-container"]["offsetWidth"];
      if (offset > 0) {
        //	鼠标向上滚动  元素向右移动  视图向左移动
        //  this.translatePosition<0
        if (ctx.translatePosition < 0) {
          let remainOffset = -ctx.translatePosition;
          offset = Math.min(remainOffset, offset);
        } else {
          return;
        }
      } else {
        //	鼠标向下滚动  元素向左移动  视图向右移动
        // tags-list.offsetWidth>tags-list-containers.offsetWidth;
        // tags-list-container.offsetWidth-this.translatePosition<tags-list.offsetWidth;
        if (targetElWidth > containerWidth) {
          if (containerWidth - ctx.translatePosition < targetElWidth) {
            let remainOffset =
              targetElWidth - (containerWidth - ctx.translatePosition);
            offset = Math.min(remainOffset, offset);
          } else {
            return;
          }
        } else {
          return;
        }
      }
      ctx.translatePosition += offset;
      targetEl["style"].left = `${ctx.translatePosition}px`;
    };
    const handelOnclik = (item, index) => {
      if (index == 0 || index == 1) {
        ctx.$refs["tags-container"]["style"]["margin-left"] = `0px`;
      }
      router.push(item.path);
    };
    //设置标签
    const setTags = route => {
      console.log(route, "route", ctx.tags.value)
      const isExist = ctx.tags.some(item => {
        return item["path"] == route.fullPath;
      });
      const isExistName = ctx.tags.some(item => {
        return route.name ? item["name"] == route.name : false;
      });

      let ExistIndex = 0;

      ExistIndex = ctx.tags.map(i => i.name).indexOf(route.name);

      if (!isExist) {
        var tags = [...ctx.tags];
        if (isExistName && !route.meta.multi) {
          //目前的tags已存在点击的这个路由
          tags[ExistIndex] = {
            title: route.meta.name,
            name: route.name,
            path: route.fullPath
          };
        } else {
          tags.push({
            title: route.meta.name,
            name: route.name,
            path: route.fullPath
          });
        }
        ctx.tags = [...tags];
        console.log(ctx.tags, " ctx.tags")
        ctx.$emit("tagschange", tags);
      }
    };
    const deleteTagByBus = item => {
      var tags = [...ctx.tags];
      for (let i in tags) {
        if (tags[i]["name"] == item.name || tags[i]["path"] == item.path) {
          tags.splice(Number(i), 1);
        }
      }
      ctx.tags = [...tags];
      ctx.$emit("tagschange", tags);
    };
    const deleteTag = (item, $event) => {
      $event.stopPropagation();
      var tags = [...ctx.tags];
      for (let i in tags) {
        if (tags[i]["path"] == item.path) {
          tags.splice(Number(i), 1);
          if (tags.length == 0) {
            router.push("/home");
            ctx.tags = [];
            return;
          }
          if (item.path == ctx.$route.fullPath) {
            if (Number(i) == 0) {
              router.push(tags[i]["path"]);
            } else {
              router.push(tags[Number(i) - 1]["path"]);
            }
          }
        }
      }
      this.tags = [...tags];
      this.$emit("tagschange", tags);
    };
    const closeOthers = () => {
      var route = ctx.$route;
      var homeTag = ctx.tags.filter(item => {
        return item["title"] == "首页";
      });
      var tags = [
        {
          title: route.meta.name,
          name: route.name,
          path: route.fullPath
        }
      ];
      if (route.fullPath == "/home") {
        ctx.tags = [...tags];
      } else {
        ctx.tags = [...homeTag, ...tags];
      }
      ctx.$emit("tagschange", ctx.tags);
    };
    const closeAll = () => {
      var route = ctx.$route;
      if (!(route.fullPath == "/home" && ctx.tags.length == 1)) {
        ctx.tags = [];
        ctx.$emit("tagschange", ctx.tags);
        router.push("/home");
      }
    };
    const onclose = command => {
      switch (command) {
        // 关闭其他
        case "co":
          this.closeOthers();
          break;
        // 关闭所有
        case "ca":
          this.closeAll();
          break;
        default:
          break;
      }
    };
    const getWidthCompareResult = position => {
      let targetEl = ctx.$refs["tags-container"];
      //tags-list.offsetWidth
      if (targetEl) {
        var targetElWidth = targetEl["offsetWidth"];
        var containerWidth = ctx.$refs["list-container"]["offsetWidth"];
        if (position == "left") {
          return (
            containerWidth + Math.abs(ctx.translatePosition) >= targetElWidth
          );
        } else {
          return ctx.translatePosition == 0;
        }
      } else {
        return true;
      }
    };
    const selectItemScrollIntoView = () => {
      ctx.$nextTick(() => {
        let selectEle = document.getElementsByClassName("select-item")[0];
        let leftOffset = selectEle.offsetLeft;
        let widthOffset = selectEle.offsetWidth;
        let containerWidth = ctx.$refs["list-container"]["offsetWidth"];
        if (leftOffset + ctx.translatePosition + widthOffset > containerWidth) {
          ctx.handleScroll(
            -(
              leftOffset +
              ctx.translatePosition +
              widthOffset +
              2 -
              containerWidth
            )
          );
        }
        if (leftOffset + ctx.translatePosition + widthOffset < 0) {
          ctx.handleScroll(-ctx.translatePosition - leftOffset);
        }
      });
    };
    //定义生命周期函数
    onBeforeMount(() => {
      tags.value = homeTag.homeTags
      ctx.setTags(router);
    });
    onMounted(() => {
      ctx.$bus.$on("closeTag", val => {
        ctx.deleteTagByBus(val);
      });
    });
    //监听数据
    onBeforeRouteUpdate(to => {
      ctx.setTags(to);
      ctx.selectItemScrollIntoView();
    });

    //计算属性
    return {
      //变量
      tags,
      isShow,
      translatePosition,
      //函数
      onmousewheel,
      handleScroll,
      handelOnclik,
      setTags,
      newR,
      deleteTagByBus,
      deleteTag,
      closeOthers,
      closeAll,
      onclose,
      getWidthCompareResult,
      selectItemScrollIntoView
    };
  }
};
</script>

<style scoped lang="scss">
$tagHeight: 40px;
.tags-container {
  height: $tagHeight;
  background-color: #fff;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  border-top: 1px #e8ecef solid;
  box-shadow: 0px 10px 8px -6px rgba(0, 0, 0, 0.1);
  z-index: 2;
  .tags-list-container {
    font-size: 12px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    height: $tagHeight;
    .elleft {
      position: absolute;
      left: 0;
      top: 0;
      height: $tagHeight;
      line-height: 48px;
      width: 20px;
      text-align: center;
      background-color: #fff;
      cursor: pointer;
      & > i {
        font-size: 16px;
        color: #666;
      }
      &.disabled {
        & > i {
          color: #f1f1f1;
        }
        cursor: not-allowed;
      }
    }
    .elright {
      position: absolute;
      right: 3px;
      top: 0;
      height: $tagHeight;
      line-height: 48px;
      width: 20px;
      text-align: center;
      background-color: #fff;
      cursor: pointer;
      & > i {
        font-size: 16px;
        color: #666;
      }
      &.disabled {
        & > i {
          color: #f1f1f1;
        }
        cursor: not-allowed;
      }
    }
    .tags-list-wrapper {
      position: relative;
      overflow: hidden;
      height: $tagHeight;
      .tags-list {
        overflow-y: hidden;
        overflow-x: auto;
        box-sizing: border-box;
        width: auto;
        white-space: nowrap;
        position: absolute;
        left: 0;
        top: 0;
        transition: left 0.3s linear;
        .tags-item {
          height: 33px;
          margin: 0 2px;
          padding-top: 7px;
          display: inline-block;
          .tags-item-button {
            height: 36px;
            line-height: 33px;
            padding: 0 15px;
            border: 1px solid #e8ecef;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            font-family: PingFangSC-Regular;
            color: #333;
            cursor: pointer;
            font-size: 14px;
          }
          .tags-item-button.select-item {
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>
