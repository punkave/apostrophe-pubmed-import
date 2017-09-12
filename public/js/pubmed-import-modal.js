apos.define('apostrophe-pieces-pubmed-import-modal', {
  extend: 'apostrophe-modal',
  source: 'pubmed-import-modal',

  construct: function(self, options) {
    self.manager = options.manager;

    self.beforeShow = function(callback) {

      self.$importButton = self.$el.find('[data-apos-pubmed-import]');

      self.$importButton.on('click', function() {
        if (self.validateForm() === false) {
          // we are good, send it over
          apos.ui.globalBusy(true);
          $.ajax({
            method: "GET",
            url: self.action + "/import",
            data: self.$form.serialize()
          })
          .done(function( response ) {
            apos.ui.globalBusy(false);
            apos.change(self.manager.name);
            $('[data-pubmed-import-status]').text(response.msg).attr('status', response.status)
          });

        }
      })

      self.validateForm = function() {

        self.$form = self.$el.find('[data-pubmed-import-form]');

        var error = false;
        var requiredClass = 'apos-error--required';
        var $spreadsheet = self.$form.find('input[name="googleSpreadsheetId"]');

        if (!$spreadsheet.val()) {
          $spreadsheet.parent().addClass(requiredClass);
          error = true;
        } else {
          $spreadsheet.parent().removeClass(requiredClass);
        }

        return error;
      }

      return setImmediate(callback);
    };
  }
});
