let cat = {
  1:{
    name:'Hymn',
    desc:'',
    variety:'Type',
    group:'',
    url:'hymns',
    // 'cat'+Category.variety
    // queryWhereDynamic:['??', '==', 'Category.idDoc'],
    // queryWhereStatic:['catType', "==", '1'],
    total:0
  },
  2:{
    name:'Praise & Worship',
    desc:'',
    variety:'Type',
    group:'',
    url:'pnw',
    // 'cat'+Category.variety
    // queryWhereDynamic:['??', '==', 'Category.idDoc'],
    // queryWhereStatic:['catType', "==", '2'],
    total:0
  },
  3:{
    name:'Other',
    desc:'',
    variety:'Type',
    group:'',
    total:0
  },
  4:{
    name:'ZBC',
    desc:'',
    variety:'Kind',
    group:'zbc',
    url:'zbc',
    // 'cat'+Category.variety+'.'+Category.group
    // queryWhereDynamic:['??', '>', ''],
    // queryWhereStatic:['catKind.zbc', ">", ''],
    total:0
  },
  12:{
    name:'Myanmar Hymn',
    desc:'',
    variety:'Kind',
    group:'myn',
    url:'myn',
    total:0
  },
  5:{
    name:'Galhiam',
    desc:'',
    variety:'Kind',
    group:'glh',
    url:'galhiam',
    // 'cat'+Category.variety+'.'+Category.group
    // queryWhereDynamic:['??', '>', ''],
    // queryWhereStatic:['catKind.glh', ">", ''],
    total:0
  },
  6:{
    name:'Album',
    desc:'',
    variety:'Kind',
    group:'alb',
    url:'albums',
    // 'cat'+Category.variety+'.'+Category.group
    // queryWhereDynamic:['??', '>', ''],
    // queryWhereStatic:['catKind.alb', ">", ''],
    total:0
  },
  7:{
    name:'Other',
    desc:'',
    variety:'Kind',
    group:'oth',
    // 'cat'+Category.variety+'.'+Category.group
    // queryWhereDynamic:['??', '>', ''],
    // queryWhereStatic:['catKind.oth', ">", ''],
    total:0
  },
  8:{
    name:'English',
    desc:'',
    variety:'Lang',
    group:'en',
    url:'',
    // 'cat'+Category.variety+'.'+Category.group
    // queryWhereDynamic:['??', '==', ''],
    // queryWhereStatic:['catLang', "==", '1'],
    total:0
  },
  9:{
    name:'Myanmar',
    desc:'',
    variety:'Lang',
    group:'my',
    url:'',
    total:0
  },
  10:{
    name:'Zolai',
    desc:'',
    variety:'Lang',
    group:'zo',
    url:'',
    total:0
  },
  11:{
    name:'Other',
    desc:'',
    variety:'Lang',
    group:'oh',
    url:'',
    total:0
  }
};
for(var id in cat) {
  this.dataService.db().collection("category").doc(id).set(cat[id]).then(function() {
    console.log('Posted',id);
  }).catch(function(error) {
    console.log(error.message,id);
  });
}