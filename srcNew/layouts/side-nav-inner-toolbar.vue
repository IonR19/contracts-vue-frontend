

<script>
import DxButton from "devextreme-vue/button";
import DxDrawer from "devextreme-vue/drawer";
import DxScrollView from "devextreme-vue/scroll-view";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";

import HeaderToolbar from "../components/header-toolbar";
import SideNavMenu from "../components/side-nav-menu";
import menuItems from "../app-navigation";

export default {
  props: {
    title: String,
    isXSmall: Boolean,
    isLarge: Boolean
  },
  methods: {
    toggleMenu(e) {
      const pointerEvent = e.event;
      pointerEvent.stopPropagation();
      if (this.menuOpened) {
        this.menuTemporaryOpened = false;
      }
      this.menuOpened = !this.menuOpened;
    },
    handleSideBarClick() {
      if (this.menuOpened === false) this.menuTemporaryOpened = true;
      this.menuOpened = true;
    }
  },
  data() {
    return {
      menuOpened: this.isLarge,
      menuTemporaryOpened: false,
      menuItems
    };
  },
  computed: {
    drawerOptions() {
      const shaderEnabled = !this.isLarge;
      return {
        menuMode: this.isLarge ? "shrink" : "overlap",
        menuRevealMode: this.isXSmall ? "slide" : "expand",
        minMenuSize: this.isXSmall ? 0 : 60,
        menuOpened: this.isLarge,
        closeOnOutsideClick: shaderEnabled,
        shaderEnabled
      };
    },
    headerMenuTogglerEnabled() {
      return this.isXSmall;
    },
    scrollView() {
      return this.$refs["scrollViewRef"].instance;
    }
  },
  watch: {
    isLarge() {
      if (!this.menuTemporaryOpened) {
        this.menuOpened = this.isLarge;
      }
    },
    $route() {
      if (this.menuTemporaryOpened || !this.isLarge) {
        this.menuOpened = false;
        this.menuTemporaryOpened = false;
      }
      this.scrollView.scrollTo(0);
    }
  },
  components: {
    DxButton,
    DxDrawer,
    DxScrollView,
    DxToolbar,
    DxItem,
    HeaderToolbar,
    SideNavMenu
  }
};
</script>

<style lang="scss">
.side-nav-inner-toolbar {
  width: 100%;
}

.container {
  height: 100%;
  flex-direction: column;
  display: flex;
}

.layout-body {
  flex: 1;
  min-height: 0;
}

.content {
  flex-grow: 1;
}

#navigation-header {
  @import "../themes/generated/variables.additional.scss";
  background-color: $base-accent;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  .menu-button .dx-icon {
    color: $base-text-color;
  }

  .screen-x-small & {
    padding-left: 20px;
  }

  .dx-theme-generic & {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
