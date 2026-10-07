/**
 * Project Nova — Client-Side Hash Router
 * Supports fast seamless view switching, deep-linking, and document title updates.
 */

class NovaRouter {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('DOMContentLoaded', () => this.handleRoute());
  }

  navigate(route) {
    window.location.hash = route;
  }

  handleRoute() {
    const rawHash = window.location.hash.slice(1) || 'home';
    const [path, param] = rawHash.split('/');

    const routeKey = path.toLowerCase();
    const routeHandler = this.routes[routeKey] || this.routes['home'];

    // Update active view DOM
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active-view');
    });

    const activeViewId = `view-${routeKey}`;
    const targetView = document.getElementById(activeViewId) || document.getElementById('view-home');
    if (targetView) {
      targetView.classList.add('active-view');
    }

    // Update nav links active state
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkTarget = link.getAttribute('data-route');
      if (linkTarget === routeKey) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile drawer if open
    if (window.NovaApp && window.NovaApp.closeMobileDrawer) {
      window.NovaApp.closeMobileDrawer();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Execute route callback
    if (routeHandler) {
      routeHandler(param);
    }

    // Update page title
    const titles = {
      home: 'Nova — Premier Digital Publication & Future Essays',
      blogs: 'Essays & Deep Dives — Nova',
      about: 'Editorial Manifesto & Writers — Nova',
      contact: 'Connect & Inquire — Nova',
      payment: 'Memberships & Subscriptions — Nova'
    };
    document.title = titles[routeKey] || 'Nova Editorial';
  }
}

window.NovaRouter = NovaRouter;
