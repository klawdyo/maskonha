# Maskonha

A powerful and flexible masking library for TypeScript/JavaScript.

## Installation

```bash
npm install maskonha
```

## Features

- **TypeScript Support**: Full type definitions included.
- **Dynamic Case Handling**: Force uppercase, lowercase, or keep original.
- **Customizable**: Define your own mask tokens.
- **Lightweight**: Zero dependencies.

## Usage

### Basic Masking

Use the `Maskonha.mask` method to apply a pattern to a string.

```typescript
import { Maskonha } from 'maskonha';

// Default behavior:
// '0' -> Numbers only
// 'A' -> Alphanumeric (force UPPERCASE)
// 'a' -> Alphanumeric (force lowercase)

// Car Plate
Maskonha.mask('bra2e19', 'AAA0A00'); 
// => 'BRA2E19'

// Username/Lower case
Maskonha.mask('USER-NAME-123', 'aaaaaa-000');
// => 'userna-123'

// Mixed Case
Maskonha.mask('NOME', 'A-a-A-a');
// => 'N-o-M-e'

// Restricted to numbers (skips letters)
Maskonha.mask('A1B2', '0000');
// => '12'
```

### Unmasking

Remove all special characters and keep only alphanumeric values.

```typescript
Maskonha.unmask('ABC-123.456-XX');
// => 'ABC123456XX'
```

### Custom Tokens

You can customize which characters represent numbers, uppercase, and lowercase slots.

```typescript
// Using '9' for numbers instead of '0'
Maskonha.mask('59650000', '99.999-999', { number: '9' });
// => '59.650-000'

// Using custom symbols for case
Maskonha.mask('cla1234', '$$$-@@@@', { upper: '$', number: '@' });
// => 'CLA-1234'
```

## API

### `Maskonha.mask(value, pattern, options?)`

- `value`: The input string to mask.
- `pattern`: The mask pattern.
- `options`:
    - `number`: (Default: `'0'`) Token for numeric digits.
    - `upper`: (Default: `'A'`) Token for uppercase alphanumeric.
    - `lower`: (Default: `'a'`) Token for lowercase alphanumeric.

### `Maskonha.unmask(value)`

- `value`: The string to clean.

## License

MIT
