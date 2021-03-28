import { fetchGenres } from 'api/genreService';
import { getGenres } from 'api/movieService';
import { genres } from 'fixtures';

jest.mock('api/movieService');

const mockGetGenres = getGenres as jest.MockedFunction<typeof getGenres>;

describe('genreService', () => {
  test('should return genres if it already exists', async () => {
    await expect(fetchGenres(genres)).resolves.toEqual(genres);
    expect(mockGetGenres).not.toHaveBeenCalled();
  });

  test('should fetch and return genres if it does not already exist', async () => {
    mockGetGenres.mockResolvedValueOnce({ genres });
    await expect(fetchGenres([])).resolves.toEqual(genres);
    expect(mockGetGenres).toHaveBeenCalled();
  });
});
