import { getInitialPage, buildGenreText, getPathsFromCurrentLocation } from 'helper';
import { genres, movie } from 'fixtures';

describe('helper', () => {
  describe('getInitialPage', () => {
    test('should return initial page as zero when value not provided', () => {
      expect(getInitialPage()).toEqual(0);
    });

    test('should return initial page when value is provided', () => {
      expect(getInitialPage('10')).toEqual(9);
    });
  });

  describe('buildGenreText', () => {
    const invalidGenreIdsTestCases: [string, number[] | undefined][] = [
      ['undefined', undefined],
      ['empty array', []],
    ];

    test.each(invalidGenreIdsTestCases)(
      'should return empty string when movie genreIds is %p',
      (_, movieGenreIds) => {
        expect(buildGenreText(genres, movieGenreIds)).toBe('');
      },
    );

    test('should return genre text', () => {
      expect(buildGenreText(genres, movie.genre_ids)).toMatchInlineSnapshot(
        `"crime, thriller, action"`,
      );
    });
  });

  describe('getPathsFromCurrentLocation', () => {
    const basePath = 'popular';
    test('should return basePath and param', () => {
      expect(getPathsFromCurrentLocation(`movies/${basePath}/1`)).toEqual({ basePath, param: '1' });
    });
    test('should return basePath and param (as null)', () => {
      expect(getPathsFromCurrentLocation(`movies/${basePath}`)).toEqual({ basePath, param: null });
    });
  });
});
