// Global type declaration for SCSS/CSS modules (required for TypeScript 6+)
declare module '*.scss' {
  const styles: Record<string, string>;
  export default styles;
}

declare module '*.css' {
  const styles: Record<string, string>;
  export default styles;
}
