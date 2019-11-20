'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var appCpanel = new Vue({
  el: "#appCpanel",
  data: {
    cpanels: [],
    accountsData: [],
    search: '',
    total: 0
  },
  delimiters: ['[[', ']]'],
  methods: {

    fcsearch: function fcsearch() {
      if (this.search != '') {
        var expresion = new RegExp('^.*' + this.search + '.*$', 'i');
        this.cpanels = this.accountsData.filter(function (item) {
          return item['first_name'].match(expresion) || item['last_name'].match(expresion) || item['registration_key'].match(expresion) || item['first_name'].concat(' ' + item['last_name']).match(expresion) || item['last_name'].concat(' ' + item['first_name']).match(expresion);
        });
      } else {
        this.cpanels = this.accountsData;
      }
    },
    btnediItem: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, has_trial_coupon, mkting_client, ismarket_listing) {
        var _this = this;

        var checked_has, checked_mkting_client, checked_ismarket_listing;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                checked_has = '', checked_mkting_client = '', checked_ismarket_listing = '';

                if (has_trial_coupon == '1') {
                  checked_has = 'checked';
                }

                if (mkting_client == '1') {
                  checked_mkting_client = 'checked';
                }

                if (ismarket_listing == '1') {
                  checked_ismarket_listing = 'checked';
                }

                _context.next = 6;
                return Swal.fire({
                  title: 'Setting Account Cpanel',
                  html: '<div class="row"><label class="col-sm-7 col-form-label">Modal Pay Active?</label><div class="col-sm-2"><input id="has_trial_coupon" type="checkbox" ' + checked_has + ' /></div></div><div class="row"><label class="col-sm-7 col-form-label">is marketing client ?</label><div class="col-sm-2"><input id="mkting_client" type="checkbox" ' + checked_mkting_client + ' /></div></div><div class="row"><label class="col-sm-7 col-form-label">Off Market Listing Active ?</label><div class="col-sm-2"><input id="ismarket_listing" type="checkbox" ' + checked_ismarket_listing + ' /></div></div>',
                  focusConfirm: false,
                  showCancelButton: true
                }).then(function (result) {
                  if (result.value) {
                    has_trial_coupon = document.getElementById('has_trial_coupon').checked, mkting_client = document.getElementById('mkting_client').checked, ismarket_listing = document.getElementById('ismarket_listing').checked, _this.ediItem(id, has_trial_coupon, mkting_client, ismarket_listing);
                    Swal.fire('', 'Registration updated successfully.', 'success');
                  }
                });

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function btnediItem(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return btnediItem;
    }(),

    listData: function listData() {
      var _this2 = this;

      axios.post(idxUrl.list).then(function (response) {
        _this2.accountsData = response.data.data;
        _this2.cpanels = _this2.accountsData;
      });
    },

    ediItem: function ediItem(id, has_trial_coupon, mkting_client, ismarket_listing) {
      var _this3 = this;

      console.log(has_trial_coupon, mkting_client, ismarket_listing);
      var vtrial = '0',
          vismarket = '0',
          vmkting = '0';
      var data = new FormData();

      if (has_trial_coupon == 'on' || has_trial_coupon != false) vtrial = '1';

      if (mkting_client == 'on' || mkting_client != false) vmkting = '1';

      if (ismarket_listing == 'on' || ismarket_listing != false) vismarket = '1';

      data.append("id", id);
      data.append("has_trial_coupon", vtrial);
      data.append("mkting_client", vmkting);
      data.append("ismarket_listing", vismarket);

      axios.post(idxUrl.generate, data).then(function (response) {
        _this3.listData();
      });
    }

  },
  created: function created() {
    this.listData();
  },
  computed: {
    totalBuilding: function totalBuilding() {
      return this.total;
    }
  }
});