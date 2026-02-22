import { describe, test, expect } from 'vitest';
import { Maskonha } from './maskonha';

describe('Maskonha Class - Regras de Case', () => {

  describe('mask()', () => {
    test('deve forçar MAIÚSCULAS com o seletor "A"', () => {
      // Placa de carro com letras minúsculas no input
      const result = Maskonha.mask('bra2e19', 'AAA0A00');
      expect(result).toBe('BRA2E19');
    });

    test('deve forçar minúsculas com o seletor "a"', () => {
      // Exemplo de username ou código que deve ser minúsculo
      const result = Maskonha.mask('USER-NAME-123', 'aaaaaa-000');
      expect(result).toBe('userna-123');
    });

    test('deve misturar maiúsculas e minúsculas se a máscara pedir', () => {
      const result = Maskonha.mask('NOME', 'A-a-A-a');
      expect(result).toBe('N-o-M-e');
    });

    // test('deve manter números intactos mesmo com seletores de letra', () => {
    //   const result = Maskonha.mask('1a2b', 'A0A0');
    //   expect(()=>Maskonha.mask('1a2b', 'A0A0')).toThrow();
    // });

    test('deve ignorar caracteres que não batem com o tipo (ex: letra em slot "0")', () => {
      const result = Maskonha.mask('A1B2', '0000');
      expect(result).toBe('12');
    });
  });

  describe('unmask()', () => {
    test('deve limpar tudo que não é alfanumérico', () => {
      expect(Maskonha.unmask('ABC-123.456-XX')).toBe('ABC123456XX');
    });

    test('deve lidar com strings vazias ou nulas', () => {
      expect(Maskonha.unmask(null)).toBe('');
      expect(Maskonha.unmask(undefined)).toBe('');
    });
  });


  test('deve aplicar máscara substituindo o "0" padrão pelo "9"', () => {
    const data = [
      {
        input: '59650000',
        pattern: '99.999-999',
        expected: '59.650-000',
      },
      {
        input: 'EK2KZZUJ000148',
        pattern: 'AA.AAA.AAA/9999-99',
        expected: 'EK.2KZ.ZUJ/0001-48',
      },
    ];


    data.forEach(({ input, pattern, expected }) => {
      const result = Maskonha.mask(input, pattern, { number: '9' });
      expect(result).toBe(expected);
    });
  });

});