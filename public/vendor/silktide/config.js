// Silktide Consent Manager Configuration
// https://silktide.com/consent-manager/

if (typeof silktideCookieBannerManager !== 'undefined') {
  silktideCookieBannerManager.updateCookieBannerConfig({
    background: { showBackground: true },
    cookieIcon: { position: 'bottomLeft' },
    cookieTypes: [
      {
        id: 'necessary',
        name: 'Niezbędne',
        description:
          '<p>Te pliki cookie są niezbędne do prawidłowego działania strony i nie można ich wyłączyć.</p>',
        required: true,
      },
      {
        id: 'analytics',
        name: 'Analityczne',
        description: '<p>Te pliki cookie pomagają nam ulepszać stronę.</p>',
        defaultValue: false,
        onAccept: function () {
          if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', { analytics_storage: 'granted' })
          }
        },
        onReject: function () {
          if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', { analytics_storage: 'denied' })
          }
        },
      },
    ],
    text: {
      banner: {
        description:
          "<p>Używamy plików cookie niezbędnych do prawidłowego funkcjonowania strony <a href='/privacy-policy' target='_blank'>Polityka prywatności</a></p>",
        acceptAllButtonText: 'Akceptuj wszystkie',
        rejectNonEssentialButtonText: 'Odrzuć opcjonalne',
        preferencesButtonText: 'Preferencje',
      },
      preferences: {
        title: 'Dostosuj preferencje plików cookie',
        description: '<p>Możesz wybrać, które typy plików cookie chcesz zaakceptować.</p>',
      },
    },
  })
}
