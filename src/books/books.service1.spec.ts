import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';

// Mockeamos la clase Pool completa
jest.mock('pg', () => {
  return {
    Pool: jest.fn(() => mockPool),
  };
});

// Mock manual del Pool y su método query
const mockPool = {
  query: jest.fn(),
};

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should return a book by ID', async () => {
    const mockBook = {
      id: 1,
      titulo: 'Mocked Book',
      descripcion: 'Mock description',
      autorid: 101,
      editorialid: 202,
      fechadepublicacion: new Date('2024-08-01T00:00:00.000Z'),
      precio: 150.99,
    };

    // Mockeamos la respuesta de la consulta
    mockPool.query.mockResolvedValueOnce({ rows: [mockBook] });

    // Espiamos el método findOne del servicio
    const findOneSpy = jest.spyOn(service, 'findOne');

    const result = await service.findOne(1);

    // Verificamos que el resultado sea el esperado
    expect(result).toEqual([mockBook]);
    expect(findOneSpy).toHaveBeenCalledWith(1);
    expect(mockPool.query).toHaveBeenCalledWith(`
        SELECT * FROM books
        WHERE books.id = 1
      `);
  });
});
