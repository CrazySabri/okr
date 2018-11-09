
export default {
  methods: {
    getParentOkrList(list) {
      if(!list || !list.length) return [];

      let okr = list.filter((x) => {
        return !!!x.parentId
      })

      return okr
    },
    getChildrenOkrList(list, parent) {
      if(!parent || !parent.children || !parent.children.length) return;
      if(this.loop > 200) return;
      this.loop++

      var childrenlist = []
      let child;

      parent.children.map((id) => {
        child = list.find((x) => {
          return x.id == id
        })

        if(child) {
          childrenlist.push(Object.assign({}, child))
        }
      })

      if(childrenlist.length) {
        childrenlist.map((x) => {
          x.children = this.getChildrenOkrList(list, x)
        })
      }
      return childrenlist.slice(0)
    },
    searchForBranchOkr(list, okr_id) {
      var found;
      list.map((x) => {
        if(x.id == okr_id) {
          found = x
        } else {
          if(x.children && x.children.length) {
            found = this.searchForBranchOkr(x.children, okr_id)
          }
        }
      })
      return found;
    },
    getTreeOkrList(okr_id, list, displayParent) {
      if(displayParent === undefined) {
        displayParent = true
      }

      if(list === undefined) {
        list = []
      }

      if(okr_id) {
        let foundOkrInTree = list.find((x) => { return x.id == okr_id })

        if(!foundOkrInTree) return []

        let treeFilterList;
        if(displayParent) {
          treeFilterList = [foundOkrInTree]
          treeFilterList.map((x) => {
            x.children = this.getChildrenOkrList(list, x, true)
          })
        } else {
          treeFilterList = this.getChildrenOkrList(list, foundOkrInTree)
        }
        return treeFilterList
      }

      let treeList = this.getParentOkrList(list)
      treeList.map((x) => {
        x.children = this.getChildrenOkrList(list, x)
      })
      return treeList.slice(0)
    },
  }
};
