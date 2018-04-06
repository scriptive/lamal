firebase: {
    apiKey: "AIzaSyBOawkIaNOR0oc9gDjAwYnnmVSnp-Bcvog",
    authDomain: "zomi-server.firebaseapp.com",
    databaseURL: "https://zomi-server.firebaseio.com",
    projectId: "zomi-server",
    storageBucket: "zomi-server.appspot.com",
    messagingSenderId: "561736444893"
},
page:{
  home:{
    id:1,
    name:'Home',
    class:'icon-home',
    title:'Lamal'
  },
  category:{
    id:2,
    name:'Category',
    class:'category',
    home:true
  },
  song:{
    id:3,
    name:'Song',
    class:'song',
    home:true
  },
  lyric:{
    id:4,
    name:'Lyric',
    class:'lyric',
  },
  editor:{
    id:4,
    name:'editor',
    class:'editor',
  },
  search:{
    id:5,
    name:'Search',
    class:'icon-lookup',
    title:'Search'
  },
  result:{
    id:6,
    title:'Result'
  },
  user:{
    id:7,
    class:'user',
    title:'user',
    auth:'user'
  },
  signin:{
    id:8,
    class:'signin',
    title:'signin',
    auth:'guest'
  },
  // signout:{
  //   id:7,
  //   class:'signout',
  //   title:'signout'
  // },
  signup:{
    id:9,
    class:'signup',
    title:'signup',
    auth:'guest'
  },
  fgpwd:{
    id:10,
    class:'fgpwd',
    title:'fgpwd',
    auth:'guest'
  },
  setting:{
    id:11,
    class:'icon-settubg',
    title:'Setting'
  },
  about:{
    id:12,
    name:'About',
    class:'icon-about',
    title:'About'
  },
  contact:{
    id:13,
    name:'Contact',
    class:'icon-contact',
    title:'Contact'
  }
},
file: {
  template: 'z.html',
  // book:'https://storage.googleapis.com/effortless/book.json',
  // urlLocal:'eba/bId.xml',
  // urlAPI:['https://storage.googleapis.com/effortless/bId.xml']
  // urlAPI:['lang/bId.xml']
  // https://drive.google.com/uc?export=download&id=0B_7bPVufJ-j4b3ZiRFBPQkZZbXM
  // http://laisiangtho.github.io/core/bible/bId.xml
},
fileStorage:{
  RequestQuota: 1073741824,
  Permission: 0,
  objectStore:{
   name:'lamal',
   version:1
  }
},
lang: {
  isLocalRemove: 'Would you like to remove "{is}" from local?',
  tryAWord: 'Try a word or two!',
  noMatchFor: 'No match for {for}!',
  noCategoryContent: 'This category has no content...',
  noCategoryData: 'This category has no data...',
  noBookmark: 'None',
  noLanguage: '...',
  isNotFound: 'Not found: "{is}"',
  Loading: 'Loading',
  OneMoment:'one moment please!',
  Error: 'Error',
  Add:'Add',
  Adding:'Adding',
  Remove:'Remove',
  Removing:'Removing',
  Update:'Update',
  Updating:'Updating',
},
classname: {
  active: 'active',
  inactive: 'inactive',
  filter: 'filter',
  available: 'available'
},
name:'Lamal',
version:'1.0.0',
build:'1.0.1'