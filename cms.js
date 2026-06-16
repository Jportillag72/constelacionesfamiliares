const AUTH_KEY = "amor-escobio-admin-auth";
const USER_HASH = "bdea6a49c6cadf7981916b98f8cb4ad6ce3fe0b2371dc1e634b01bbc8eef3c4c";
const PASSWORD_HASH = "1e8affbc8936423042a755fe8bb926d1f9903bc988641a5e6a87fa54a5c7c1ee";

if (window.location.search) {
  window.history.replaceState(null, "", window.location.pathname);
}

const loginPanel = document.querySelector("[data-login-panel]");
const adminContent = document.querySelector("[data-admin-content]");
const loginForm = document.querySelector("#login-form");
const loginStatus = document.querySelector("[data-login-status]");
const logoutButton = document.querySelector("[data-logout]");
const form = document.querySelector("#cms-form");
const statusNode = document.querySelector("[data-admin-content] .status");
const jsonBox = document.querySelector("[data-json-box]");
const exportButton = document.querySelector("[data-export-content]");
const importButton = document.querySelector("[data-import-content]");
const resetButton = document.querySelector("[data-reset-content]");

const fields = [
  "heroText",
  "title",
  "description",
  "date",
  "location",
  "modality",
  "ctaText",
  "ctaHref",
];
let adminInitialized = false;

const hashText = async (value) => {
  const data = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const setLoginStatus = (message) => {
  if (!loginStatus) {
    return;
  }

  loginStatus.textContent = message;
};

const setAuthenticated = (isAuthenticated) => {
  if (loginPanel) {
    loginPanel.hidden = isAuthenticated;
  }

  if (adminContent) {
    adminContent.hidden = !isAuthenticated;
  }

  if (logoutButton) {
    logoutButton.hidden = !isAuthenticated;
  }
};

const setStatus = (message) => {
  if (!statusNode) {
    return;
  }

  statusNode.textContent = message;
};

const getCourseFromForm = () =>
  fields.reduce((course, field) => {
    course[field] = form.elements[field].value.trim();
    return course;
  }, {});

const fillForm = (content) => {
  fields.forEach((field) => {
    form.elements[field].value = content.course[field] || "";
  });
};

const initAdmin = () => {
  if (!form || !window.SiteContent || adminInitialized) {
    return;
  }

  adminInitialized = true;
  fillForm(window.SiteContent.load());

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const current = window.SiteContent.load();
    const next = window.SiteContent.save({
      ...current,
      course: {
        ...current.course,
        ...getCourseFromForm(),
      },
    });
    fillForm(next);
    setStatus("Cambios guardados.");
  });
};

if (window.sessionStorage.getItem(AUTH_KEY) === "true") {
  setAuthenticated(true);
  initAdmin();
} else {
  setAuthenticated(false);
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!window.crypto || !window.crypto.subtle) {
      setLoginStatus("Este navegador no permite validar el acceso.");
      return;
    }

    const username = loginForm.elements.username.value.trim();
    const password = loginForm.elements.password.value;
    const [usernameHash, passwordHash] = await Promise.all([hashText(username), hashText(password)]);

    if (usernameHash === USER_HASH && passwordHash === PASSWORD_HASH) {
      window.sessionStorage.setItem(AUTH_KEY, "true");
      loginForm.reset();
      setLoginStatus("");
      setAuthenticated(true);
      initAdmin();
      return;
    }

    setLoginStatus("Usuario o contraseña incorrectos.");
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    window.sessionStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
    setLoginStatus("");
  });
}

if (exportButton && jsonBox && window.SiteContent) {
  exportButton.addEventListener("click", () => {
    jsonBox.value = JSON.stringify(window.SiteContent.load(), null, 2);
    setStatus("JSON exportado.");
  });
}

if (importButton && jsonBox && window.SiteContent) {
  importButton.addEventListener("click", () => {
    try {
      const next = window.SiteContent.save(JSON.parse(jsonBox.value));
      fillForm(next);
      setStatus("JSON importado.");
    } catch (error) {
      setStatus("El JSON no es válido.");
    }
  });
}

if (resetButton && window.SiteContent) {
  resetButton.addEventListener("click", () => {
    const next = window.SiteContent.reset();
    fillForm(next);
    if (jsonBox) {
      jsonBox.value = "";
    }
    setStatus("Contenido restaurado.");
  });
}
