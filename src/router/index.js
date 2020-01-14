import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddNote from '@/components/AddNote'
import EditNote from '@/components/EditNote'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/addnote',
      name: 'AddNote',
      component: AddNote
    },
    {
      path: '/editnote/:id',
      name: 'EditNote',
      component: EditNote
    }
  ]
})
