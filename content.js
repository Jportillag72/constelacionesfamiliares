(function () {
  const STORAGE_KEY = "amor-escobio-content-v1";
  const DEFAULT_CONTENT = {
    course: {
      eyebrow: "Plazas abiertas",
      title: "Nuevo Curso: Constelaciones Familiares",
      description:
        "Una formación para comprender las lealtades, cargas y dinámicas familiares desde una mirada más amplia.",
      date: "27 de septiembre",
      location: "Lugones",
      modality: "Presencial",
      heroText: "Constelaciones Familiares · 27 de septiembre",
      ctaText: "Inscribirme",
      ctaHref:
        "mailto:amorescobiosuarez@gmail.com?subject=Inscripcion%20curso%20constelaciones%20familiares",
    },
  };

  const clone = (value) => JSON.parse(JSON.stringify(value));

  const mergeContent = (content) => ({
    ...clone(DEFAULT_CONTENT),
    ...(content || {}),
    course: {
      ...DEFAULT_CONTENT.course,
      ...((content && content.course) || {}),
    },
  });

  const load = () => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return mergeContent(stored ? JSON.parse(stored) : null);
    } catch (error) {
      return mergeContent(null);
    }
  };

  const save = (content) => {
    const nextContent = mergeContent(content);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextContent));
    return nextContent;
  };

  const reset = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    return mergeContent(null);
  };

  window.SiteContent = {
    STORAGE_KEY,
    DEFAULT_CONTENT: clone(DEFAULT_CONTENT),
    load,
    save,
    reset,
    merge: mergeContent,
  };
})();
