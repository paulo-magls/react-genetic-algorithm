export function convertToRgb(hex: string): { r: number, g: number, b: number } {
    // Verifica se o hex é válido (deve começar com '#' e ter 7 caracteres no total)
    if (!/^#([0-9A-Fa-f]{6})$/.test(hex)) {
        console.error('Formato hexadecimal inválido');
        return { r: 0, g: 0, b: 0 }; // Retorna tudo zero se a string for inválida
    }

    // Remove o símbolo # (já validado) e faz a conversão para r, g, b
    const hexClean = hex.slice(1); // Remove o '#'
    
    const r = parseInt(hexClean.substring(0, 2), 16);
    const g = parseInt(hexClean.substring(2, 4), 16);
    const b = parseInt(hexClean.substring(4, 6), 16);

    return { r, g, b };
}