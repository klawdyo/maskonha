/**
 * Aplica uma máscara a uma string.
 * 
 * '0' -> Apenas números
 * 'A' -> Alfanumérico (Força MAIÚSCULA)
 * 'a' -> Alfanumérico (Força minúscula)
 * 
 * @example
 * 
 * mask('cla1234', 'AAA-0000') -> 'CLA-1234'
 * mask('cla1234', 'aaa-0000') -> 'cla-1234'
 * mask('cla1234', '$$$-@@@@', { upper: '$', number: '@' }) -> 'CLA-1234'
 * 
 */

export class Maskonha {
  /**
   * Aplica uma máscara a uma string.
   * Por padrão:
   * '0' -> Apenas números
   * 'A' -> Alfanumérico (Força MAIÚSCULA)
   * 'a' -> Alfanumérico (Força minúscula)
   * 
   * É possível customizar os caracteres da máscara através do parâmetro de configurações.
   */
  static mask(value: string | null | undefined, pattern: string, options: MaskonhaOptions = {}) {
    if (!value) return '';

    const {
      number = '0',
      upper = 'A',
      lower = 'a',
    } = options;

    let masked = '';
    let valueIdx = 0;
    const rawValue = value.toString();

    // Loop baseado no tamanho da máscara para garantir que caracteres literais 
    // ao final (ex: parênteses ou traços) sejam adicionados se necessário.
    for (let i = 0; i < pattern.length && valueIdx < rawValue.length; i++) {
      const maskChar = pattern[i];
      const valueChar = rawValue[valueIdx];

      if (maskChar === number) {
        if (/\d/.test(valueChar)) {
          masked += valueChar;
          valueIdx++;
        } else {
          // Se não é número, pula esse caractere do valor e tenta o próximo para o mesmo '0'
          valueIdx++;
          i--;
        }
      } else if (maskChar === upper || maskChar === lower) {
        // Alfanumérico: aceita letras E números
        if (/[a-zA-Z0-9]/.test(valueChar)) {
          masked += maskChar === upper
            ? valueChar.toUpperCase()
            : valueChar.toLowerCase();
          valueIdx++;
        } else {
          // Se não é alfanumérico (ex: um símbolo), pula
          valueIdx++;
          i--;
        }
      } else {
        // Caractere literal da máscara (ex: '.', '-', '(' )
        masked += maskChar;

        // Ajuste importante: se o usuário digitou o próprio caractere literal, 
        // avançamos o ponteiro do valor para não duplicar ou desalinhar.
        if (valueChar === maskChar) {
          valueIdx++;
        }
      }
    }

    return masked;
  }

  /**
   * Remove caracteres especiais, mantendo apenas letras e números.
   */
  static unmask(value: string | null | undefined) {
    if (!value) return '';
    return value.toString().replace(/[^a-zA-Z0-9]/g, '');
  }
}

export interface MaskonhaOptions {
  number?: string;
  upper?: string;
  lower?: string;
}