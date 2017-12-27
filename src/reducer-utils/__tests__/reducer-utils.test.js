import {
    isStartsWith,
    subtractFromStart
} from '../reducer-utils';

describe('Redux utils', () => {
    describe('isStartsWith', () => {
        it('source ns should match target ns', () => {
            expect(isStartsWith(
                'foo:bar:baz'.split(':'),
                'foo'.split(':')
            )).toBeTruthy();
            expect(isStartsWith(
                'foo:bar:baz'.split(':'),
                'foo:bar'.split(':')
            )).toBeTruthy();
            expect(isStartsWith(
                'foo:bar:baz'.split(':'),
                'foo:bar:baz'.split(':')
            )).toBeTruthy();
        });

        it('source ns should not match target ns', () => {
            expect(isStartsWith(
                'foo:bar:baz'.split(':'),
                'fo'.split(':')
            )).toBeFalsy();
            expect(isStartsWith(
                'foo:bar:baz'.split(':'),
                'foo:barr'.split(':')
            )).toBeFalsy();
            expect(isStartsWith(
                'foo:bar:baz'.split(':'),
                'foo:bar:bazx'.split(':')
            )).toBeFalsy();
        });

        it('source ns with params should match target ns', () => {
            expect(isStartsWith(
                'foo:bar_1:baz'.split(':'),
                'foo:bar_.'.split(':')
            )).toBeTruthy();
            expect(isStartsWith(
                'foo:bar_1:baz'.split(':'),
                'foo:bar_.:baz'.split(':')
            )).toBeTruthy();
            expect(isStartsWith(
                'foo:bar_1:baz:quzz_1'.split(':'),
                'foo:bar_.:baz:quzz_.'.split(':')
            )).toBeTruthy();
        })
    });

    describe('subtractFromStart', () => {
        it('simple', () => {
            expect(subtractFromStart('foo', 'foo')).toEqual('');
            expect(subtractFromStart('foo:bar', 'foo')).toEqual('bar');
            expect(subtractFromStart('foo:bar', 'foo:bar')).toEqual('');
            expect(subtractFromStart('foo:bar:baz', 'foo')).toEqual('bar:baz');
            expect(subtractFromStart('foo:bar:baz', 'foo:bar')).toEqual('baz');
        });

        it('dynamic', () => {
            expect(subtractFromStart('foo_1', 'foo_.')).toEqual('');
            expect(subtractFromStart('foo_1:bar', 'foo_.')).toEqual('bar');
            expect(subtractFromStart('foo_1:bar_1', 'foo_.:bar_.')).toEqual('');
            expect(subtractFromStart('foo:bar_1:baz_1', 'foo:bar_.')).toEqual('baz_1');
            expect(subtractFromStart('foo:bar_1:baz_1', 'foo:bar_.:baz_.')).toEqual('');
        });
    });
});