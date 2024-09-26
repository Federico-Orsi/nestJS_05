import { Test, TestingModule } from '@nestjs/testing';
import { Pool } from 'pg';
import { BooksService } from './books.service';


// Simulación del pool de conexión a la base de datos
const mockPool = {
  query: jest.fn()
};

describe('BooksService',  () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: Pool, // Usamos un mock del Pool para las queries
          useValue: mockPool,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar mocks entre tests
  });

  it('should return a book by ID', async () => {
    // Datos simulados que debería devolver la consulta
    const mockBook =  {
      id: 16,
      titulo: "Padre Rico Padre Pobreeeeee+++",
      descripcion: "What the rich teach...",
      fechadepublicacion: new Date('2023-08-29T03:00:00.000Z'),
      precio: "40.99",
      autorid: 4,
      editorialid: 3
    }


    mockPool.query.mockResolvedValue({ rows: [mockBook] });

    const result = await service.findOne(16);

    // // Asegurarse que el método pool.query fue llamado con la query correcta
    // expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM books WHERE books.id = 16");

    // Comprobar que el resultado es el esperado
    expect(result).toEqual([mockBook]);
  });

  // it('should handle errors', async () => {
  //   // Simulamos un error en la consulta
  //   mockPool.query.mockRejectedValue(new Error('Database Error'));

  //   const result = await service.findOne(1);

  //   // Como no hay throw en el servicio, el resultado debería ser undefined
  //   expect(result).toBeUndefined();

  //   // Confirmamos que pool.query fue llamado
  //   expect(mockPool.query).toHaveBeenCalled();
  // });
});



// import { Test, TestingModule } from '@nestjs/testing';
// import { BooksService } from './books.service';

// describe('BooksService', () => {
//   let service: BooksService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [BooksService],
//     }).compile();

//     service = module.get<BooksService>(BooksService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
