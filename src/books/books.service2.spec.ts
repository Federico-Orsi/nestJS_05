import { Test, TestingModule } from '@nestjs/testing';
import { BooksServiceTwo } from './books.service2';

// Se declara el mockPool después de que se ha creado
const mockPool = {
  query: jest.fn(),
};

jest.mock('pg', () => {
  // El mock dentro de esta función, haciendo uso correcto de mockPool
  return {
    Pool: jest.fn(() => mockPool),
  };
});

describe('BooksService', () => {
  let service: BooksServiceTwo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksServiceTwo],
    }).compile();

    service = module.get<BooksServiceTwo>(BooksServiceTwo);
  });

  afterEach(() => {
    jest.clearAllMocks();  // Limpiar los mocks después de cada test
  });

  it('should return a book by ID', async () => {
    const mockBook = {
      id: 1,
      titulo: 'Test Book',
      descripcion: 'Descripción de prueba',
      autorid: 101,
      editorialid: 202,
      fechadepublicacion: new Date('2024-08-01'),
      precio: 150.99,
    };

    // Configurar el mock para que devuelva un resultado simulado
    mockPool.query.mockResolvedValueOnce({ rows: [mockBook] });

    const result = await service.findOne(1);
    expect(result).toEqual(mockBook);
    expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM books WHERE id = $1', [1]);
  });
});
