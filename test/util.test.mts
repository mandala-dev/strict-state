import { assert, test } from 'vitest';
import { uid } from '../src/util';

test('Unique ID', () => {
    assert(uid.get() == 0);
})

test('Unique ID', () => {
    assert(uid.get() == 1);
})

test('Unique ID', () => {
    uid.reset();
    assert(uid.get() == 0);
})