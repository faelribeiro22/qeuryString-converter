import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should  create a valid query string when an object is provide', () => {
    const obj = {
      name: 'Rafael',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Rafael&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Rafael',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Rafael&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Rafael',
      abilities: { first: 'JS', second: 'TDD' },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Rafael&profession=developer';
    expect(parse(qs)).toEqual({
      name: 'Rafael',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value', () => {
    const qs = 'name=Rafael';
    expect(parse(qs)).toEqual({
      name: 'Rafael',
    });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Rafael&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Rafael',
      abilities: ['JS', 'TDD'],
    });
  });
});
