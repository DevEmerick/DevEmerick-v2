/**
 * Utilitários para navegação e janelas
 */

/**
 * Abre uma URL em nova aba com segurança
 * @param {string} url - URL para abrir
 * @param {Event} [event] - Evento opcional para prevenir propagação
 */
export function openInNewTab(url, event = null) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Recarrega a página atual
 * @param {Event} [event] - Evento opcional para prevenir ação padrão
 */
export function reloadPage(event = null) {
  if (event) {
    event.preventDefault();
  }
  window.location.href = window.location.pathname;
}
