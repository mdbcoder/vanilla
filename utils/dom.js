export const $ = (sel, scope = document) => scope.querySelector(sel);
export const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];
