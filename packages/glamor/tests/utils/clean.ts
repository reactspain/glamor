import { clean } from '../../src/utils/clean';
import * as expect from 'expect';

describe('clean.ts', () => {
  it('keeps normal objects', () => {
    const sample = { a: '' };
    Object.freeze(sample);
    expect(clean(sample)).toBe(sample);
  });

  it('keeps normal arrays of objects', () => {
    const sample = [{ a: 'b' }, { c: 'd' }];
    Object.freeze(sample);
    expect(clean(sample)).toBe(sample);
  });

  it('removes falsy values from objects', () => {
    const sample = { a: 'b', c: null };
    Object.freeze(sample);
    expect(clean(sample)).toEqual({ a: 'b' });
  });

  it('removes falsy values from objects on second level', () => {
    const sample = { a: 'b', c: { d: 'd', e: {} } };
    Object.freeze(sample);
    expect(clean(sample)).toEqual({ a: 'b', c: { d: 'd' } });
  });

  it('removes falsy values from arrays', () => {
    const sample = [1, {}, false];
    Object.freeze(sample);
    expect(clean(sample)).toEqual([1]);
  });

  it('filters objects inside arrays', () => {
    const sample = [1, { x: null }, { y: 'y' }];
    Object.freeze(sample);
    expect(clean(sample)).toEqual([1, { y: 'y' }]);
  });

  it('returns null for single falsy value', () => {
    expect(clean(null)).toBe(null);
    expect(clean(undefined)).toBe(null);
    expect(clean(false)).toBe(null);
    expect(clean({})).toBe(null);
  });

  it('returns null if there is no styles left after filtration', () => {
    const samples = [
      [[{}]],
      [],
      { a: { b: { x: null } } },
      [{}, { a: { b: false } }]
    ];
    samples.forEach(sample => {
      expect(clean(sample)).toBe(null);
    });
  });
});
