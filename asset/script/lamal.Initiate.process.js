// NOTE: Private
if (local.name.setting.hasOwnProperty('build')) {
  if (local.name.setting.build == configuration.build) {
    // NOTE: ONLOAD
    configuration.requireUpdate = 0;
  } else {
    // NOTE: ONUPDATE
    configuration.requireUpdate = 2;
  }
} else {
  // NOTE: ONINSTALL
  configuration.requireUpdate = 1;
}
if (configuration.requireUpdate) {
  local.name.setting.version = configuration.version;
  local.name.setting.build = configuration.build;
  local.update('setting');
}

return new Promise(function(resolve, reject) {
  file = fileStorage(configuration.fileStorage, {
    success: function() {
      resolve();
    },
    fail: function(e) {
      reject(e);
    }
  }
 );
});