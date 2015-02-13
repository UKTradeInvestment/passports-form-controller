var Validators = require('../../').validators;

var PostcodeData = require('../helpers/postcodes');

describe('Postcode validation - loads full UK postcode database, may take some time', function () {

    var testData;

    before(function (done) {
        this.timeout(60000);
        PostcodeData.load(function (err, data) {
            testData = data;
            done(err);
        });
    });

    it('correctly validates uk postcodes', function () {
        this.timeout(60000);
        function test(pc) {
            try {
                Validators.postcode(pc).should.be.ok;
            } catch(e) {
                // echo out the failing postcode
                console.error(pc);
                throw e;
            }
        }

        testData.forEach(function (testPostcode) {
            var pc = testPostcode.replace('  ', ' ');
            test(pc);
        });
        testData.forEach(function (testPostcode) {
            var pc = testPostcode.replace(' ', '');
            test(pc);
        });
    });

});