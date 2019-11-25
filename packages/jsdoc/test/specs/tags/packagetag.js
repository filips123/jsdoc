const logger = require('jsdoc/util/logger');

describe('@package tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/packagetag.js');
    const foo = docSet.getByLongname('foo')[0];

    it('When a symbol has a @package tag, the doclet has an `access` property set to `package`.',
        () => {
            expect(foo.access).toBe('package');
        });

    describe('JSDoc tags', () => {
        afterEach(() => {
            jsdoc.restoreTagDictionary();
        });

        it('When JSDoc tags are enabled, the @package tag does not accept a value.', () => {
            jsdoc.replaceTagDictionary('jsdoc');
            spyOn(logger, 'warn');

            jsdoc.getDocSetFromFile('test/fixtures/packagetag2.js');

            expect(logger.warn).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', () => {
        afterEach(() => {
            jsdoc.restoreTagDictionary();
        });

        it('When Closure Compiler tags are enabled, the @package tag accepts a type expression.',
            () => {
                let connectionPorts;
                let privateDocs;

                jsdoc.replaceTagDictionary('closure');
                spyOn(logger, 'warn');

                privateDocs = jsdoc.getDocSetFromFile('test/fixtures/packagetag2.js');
                connectionPorts = privateDocs.getByLongname('connectionPorts')[0];

                expect(logger.warn).not.toHaveBeenCalled();

                expect(connectionPorts).toBeObject();
                expect(connectionPorts.access).toBe('package');

                expect(connectionPorts.type).toBeObject();
                expect(connectionPorts.type.names).toBeArrayOfSize(1);
                expect(connectionPorts.type.names[0]).toBe('Object.<string, number>');
            });
    });
});
