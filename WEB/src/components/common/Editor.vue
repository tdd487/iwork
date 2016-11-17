<template lang="html">
  <div id="editor" v-html="inputContent" @input="outputContent"></div>
</template>

<script>
  import WangEditor from 'wangeditor'
  import cookies from 'js-cookie'
  import * as config from '../../assets/js/config'
  export default {
    props: {
      inputContent: {
      },
      uploadUrl: {
        default: config.serverAddr + '/upload'
      }
    },
    data () {
      return {
        content: ''
      }
    },
    computed: {},
    mounted () {
      this.createEditor()
    },
    methods: {
      createEditor () {
        const self = this
        WangEditor.config.printLog = config.editorPrintLog
        WangEditor.config.mapAk = config.baiduAK
        WangEditor.config.uploadHeaders = {
          token: cookies.get('token')
        }
        WangEditor.config.uploadImgFileName = 'file'
        const editor = new WangEditor('editor')
        editor.config.menus = ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright',
          '|', 'link', 'unlink', 'table', '|', 'img', 'video', 'location', 'insertcode', '|', 'undo', 'redo', 'fullscreen'
        ]
        editor.config.uploadImgUrl = this.uploadUrl
        editor.onchange = function () {
          self.formatContent(this.$txt.html())
        }
        editor.create()
      },
      formatContent (content) {
        this.content = content
        this.outputContent()
      },
      outputContent () {
        this.$emit('input', this.content)
      }
    },
    components: {}
  }
</script>

<style scoped>

  #editor {
    height: 500px;
  }

  .wangEditor-container {
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid #CCC;
  }
</style>
