var app = angular.module('campusConnectApp', []);

app.directive('countUp', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    scope: { target: '=', duration: '@', symbol: '@' },
    link: function(scope, element) {
      scope.$watch('target', function(newVal) {
        if (newVal === undefined || newVal === null) return;
        var rawTarget = newVal, targetVal = parseInt(rawTarget, 10), sym = scope.symbol || '';
        if (isNaN(targetVal) || String(rawTarget).indexOf(':') !== -1) {
          element.text(rawTarget + sym);
          return;
        }
        var duration = parseInt(scope.duration, 10) || 2000, startVal = 0, startTime = null;
        function animateCount(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var easeProgress = 1 - Math.pow(1 - progress, 3);
          var currentVal = Math.floor(easeProgress * (targetVal - startVal) + startVal);
          element.text(currentVal + sym);
          if (progress < 1) window.requestAnimationFrame(animateCount);
          else element.text(targetVal + sym);
        }
        if ('IntersectionObserver' in window) {
          var observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) { window.requestAnimationFrame(animateCount); observer.disconnect(); }
          }, { threshold: 0.1 });
          observer.observe(element[0]);
        } else {
          $timeout(function() { window.requestAnimationFrame(animateCount); }, 300);
        }
      });
    }
  };
}]);

app.controller('MainController', ['$scope', '$window', '$timeout', '$interval', function($scope, $window, $timeout, $interval) {
  $scope.defaultLogoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgFSPc6uNUZ_tGPhqTVQhMe6rxzWv6twdPDUgO3gwrCw&s=10';
  $scope.isLoggedIn = false;
  $scope.loginRole = 'student';
  $scope.authMode = 'login';
  $scope.showPassword = false;
  $scope.loginLoading = false;
  $scope.loginError = '';

  $scope.loginData = { username: 'allenjohn@gmail.com', password: 'password123', rememberMe: true };
  $scope.facultyLoginData = { username: 'rajeshkumar@fisat.ac.in', password: 'password123', department: 'CSE' };
  $scope.signupData = { fullName: '', email: '', studentId: '', department: 'MCA', semester: '3', password: '', confirmPassword: '', agreeTerms: false };

  $scope.signupLoading = false;
  $scope.signupError = '';
  $scope.showSignupPassword = false;
  $scope.showSignupConfirmPassword = false;

  $scope.studentProfile = { name: 'Allen John Joy', email: 'allenjohn@gmail.com', semester: '3', department: 'MCA', batch: '2025-2027', initials: 'AJ', role: 'Student' };

  $scope.setAuthMode = function(mode) { $scope.authMode = mode; $scope.loginError = ''; $scope.signupError = ''; };
  $scope.setLoginRole = function(role) {
    $scope.loginRole = role;
    $scope.loginError = '';
    $scope.signupError = '';
    if (role === 'faculty') $scope.authMode = 'login';
  };

  $scope.showProfileModal = false;
  $scope.openProfileModal = function() { $scope.showProfileModal = true; };
  $scope.closeProfileModal = function() { $scope.showProfileModal = false; };

  $scope.isDarkMode = false;
  $scope.applyThemeClass = function() {
    if ($scope.isDarkMode) {
      document.documentElement.classList.add('dark');
      if (document.body) document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      if (document.body) document.body.classList.remove('dark');
    }
  };
  $timeout(function() { $scope.applyThemeClass(); }, 0);

  $scope.toggleTheme = function() {
    $scope.isDarkMode = !$scope.isDarkMode;
    $scope.applyThemeClass();
    $scope.triggerToast($scope.isDarkMode ? 'Switched to Dark Theme Mode 🌙' : 'Switched to Light Theme Mode ☀️');
  };

  $scope.getPasswordStrength = function(pass) {
    if (!pass) return { score: 0, label: 'Not entered', color: 'bg-gray-200', width: '0%' };
    var score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500', width: '25%' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500', width: '50%' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-blue-500', width: '75%' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-500', width: '100%' };
  };

  $scope.doLogin = function(loginFormRef) {
    if (loginFormRef && loginFormRef.$invalid) return;
    if ($scope.loginData.username && $scope.loginData.password) {
      if ($scope.loginData.username.trim().toLowerCase() !== 'allenjohn@gmail.com') {
        var emailUser = $scope.loginData.username.split('@')[0];
        var formattedName = emailUser.replace(/[._]/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
        var nameParts = formattedName.split(' ').filter(Boolean);
        var initials = nameParts.length > 1 ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase() : formattedName.substring(0, 2).toUpperCase();
        $scope.studentProfile = {
          name: formattedName,
          email: $scope.loginData.username.trim(),
          studentId: 'FIT22MCA099',
          department: 'MCA',
          semester: '3',
          batch: '2025-2027',
          initials: initials,
          role: 'Student'
        };
        $scope.registrationForm.studentName = formattedName;
        $scope.registrationForm.email = $scope.studentProfile.email;
        $scope.contactForm.name = formattedName;
        $scope.contactForm.email = $scope.studentProfile.email;
      }
      $scope.isLoggedIn = true;
      $scope.activeTab = 'home';
      $scope.loginError = '';
      $scope.loginLoading = false;
      $window.scrollTo(0, 0);
      $scope.triggerToast('Welcome back to FISAT Portal, ' + $scope.studentProfile.name + '!');
      $timeout(function() { if (typeof AOS !== 'undefined') AOS.refresh(); }, 50);
    } else {
      $scope.loginError = 'Invalid student email or password. Please try again.';
    }
  };

  $scope.doSignup = function(signupFormRef) {
    if (signupFormRef && signupFormRef.$invalid) {
      $scope.signupError = 'Please fill out all required fields marked with * correctly before submitting.';
      $scope.triggerToast('Please fill out all required fields marked with * before submitting.');
      return;
    }
    if ($scope.signupData.password !== $scope.signupData.confirmPassword) {
      $scope.signupError = 'Passwords do not match. Please verify.';
      $scope.triggerToast('Passwords do not match. Please verify.');
      return;
    }
    if (!$scope.signupData.agreeTerms) {
      $scope.signupError = 'You must accept the FISAT Terms & Conduct policy to register.';
      $scope.triggerToast('Please accept the FISAT Terms & Conduct policy.');
      return;
    }
    var rawName = $scope.signupData.fullName ? $scope.signupData.fullName.trim() : 'Allen John Joy';
    var nameParts = rawName.split(' ').filter(Boolean);
    var initials = nameParts.length > 1 ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase() : rawName.substring(0, 2).toUpperCase();
    $scope.studentProfile = {
      name: rawName,
      email: $scope.signupData.email ? $scope.signupData.email.trim() : 'allenjohn@gmail.com',
      studentId: $scope.signupData.studentId ? $scope.signupData.studentId.trim() : 'FIT22MCA042',
      department: $scope.signupData.department || 'MCA',
      semester: $scope.signupData.semester || '3',
      batch: '2025-2027',
      initials: initials,
      role: 'Student'
    };
    $scope.registrationForm.studentName = rawName;
    $scope.registrationForm.email = $scope.studentProfile.email;
    $scope.contactForm.name = rawName;
    $scope.contactForm.email = $scope.studentProfile.email;

    $scope.isLoggedIn = true;
    $scope.activeTab = 'home';
    $scope.signupError = '';
    $scope.signupLoading = false;
    $window.scrollTo(0, 0);
    $scope.triggerToast('Welcome to FISAT, ' + rawName + '! Student account registered successfully 🎉');
    $timeout(function() { if (typeof AOS !== 'undefined') AOS.refresh(); }, 50);
  };

  $scope.doLogout = function() {
    $scope.isLoggedIn = false;
    $scope.authMode = 'login';
    $scope.loginRole = 'student';
    $scope.mobileMenuOpen = false;
    $scope.loginError = '';
    $scope.signupError = '';
    $scope.loginData.password = '';
    $scope.facultyLoginData.password = '';
    $scope.signupData.password = '';
    $scope.signupData.confirmPassword = '';
    $scope.triggerToast('Successfully logged out from FISAT Portal.');
    $timeout(function() { if (typeof AOS !== 'undefined') AOS.refresh(); }, 150);
  };

  $scope.heroImages = [
    { url: "https://fisat.ac.in/wp-content/uploads/2022/07/library-scaled.jpg", caption: "FISAT Central Library" },
    { url: "https://fisat.ac.in/wp-content/uploads/2022/05/cse-banner.jpg", caption: "Computer Science & Engineering Labs" },
    { url: "https://fisat.ac.in/wp-content/uploads/2022/06/RJT_6765-scaled.jpg", caption: "Hormis Nagar Campus Academic Block" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYDsMMEs20_B7PJ1yy4opODEBCgi0bLKDHFPhl88zPdcw1D-waf5wFRyb&s=10", caption: "FISAT Main Building & Front Lawn" },
    { url: "https://image-static.collegedunia.com/public/reviewPhotos/1124764/1000095984.jpg", caption: "Super FabLab & Tech Innovation Hub" }
  ];
  $scope.currentHeroImgIndex = 0;
  $scope.nextHeroImg = function() { $scope.currentHeroImgIndex = ($scope.currentHeroImgIndex + 1) % $scope.heroImages.length; };
  $scope.prevHeroImg = function() { $scope.currentHeroImgIndex = ($scope.currentHeroImgIndex - 1 + $scope.heroImages.length) % $scope.heroImages.length; };
  $scope.setHeroImg = function(index) { $scope.currentHeroImgIndex = index; };

  var slideTimer = $interval(function() { $scope.nextHeroImg(); }, 3500);
  $scope.$on('$destroy', function() { if (slideTimer) $interval.cancel(slideTimer); });

  $scope.activeTab = 'home';
  $scope.mobileMenuOpen = false;
  $scope.rsvped = false;
  $scope.toastMessage = '';
  $scope.showToast = false;

  $scope.triggerToast = function(msg) {
    $scope.toastMessage = msg;
    $scope.showToast = true;
    $timeout(function() { $scope.showToast = false; }, 3500);
  };

  $scope.toggleMobileMenu = function() { $scope.mobileMenuOpen = !$scope.mobileMenuOpen; };
  $scope.switchTab = function(tabName) {
    $scope.activeTab = tabName;
    $scope.mobileMenuOpen = false;
    $window.scrollTo({ top: 0, behavior: 'smooth' });
    $timeout(function() { if (typeof AOS !== 'undefined') AOS.refresh(); }, 100);
  };

  if ($window.history && $window.history.replaceState) {
    var path = $window.location.pathname;
    if (path.indexOf('index.html') !== -1) {
      var cleanPath = path.replace(/index\.html$/, '');
      $window.history.replaceState(null, '', cleanPath + ($window.location.search || ''));
    } else if ($window.location.hash) {
      $window.history.replaceState(null, '', path);
    }
  }

  $scope.navLinks = [
    { name: 'Home', tab: 'home', icon: 'fa-home' },
    { name: 'Notices', tab: 'notices', icon: 'fa-bullhorn' },
    { name: 'Events', tab: 'events', icon: 'fa-calendar-alt' },
    { name: 'Lost & Found', tab: 'lostfound', icon: 'fa-search' },
    { name: 'Marketplace', tab: 'marketplace', icon: 'fa-store' },
    { name: 'Placements', tab: 'placements', icon: 'fa-briefcase' },
    { name: 'Resources', tab: 'resources', icon: 'fa-book' },
    { name: 'Contact', tab: 'contact', icon: 'fa-envelope' }
  ];

  $scope.heroStats = [
    { number: '95', label: 'Placement Success Rate', symbol: '%' },
    { number: '15:1', label: 'Student-Faculty Ratio', symbol: '' },
    { number: '15', label: 'UG, PG & Ph.D. Programs', symbol: '+' }
  ];

  $scope.features = [
    { title: 'NAAC A+ Grade & UGC Autonomous', icon: 'fas fa-award', iconBoxClass: 'bg-primary text-white', delay: '0', desc: 'Accredited with NAAC A+ Grade (3.45 CGPA), NBA accredited engineering branches, and UGC Autonomous Institution status.' },
    { title: 'FISAT FabLab & AI Research Hub', icon: 'fas fa-microchip', iconBoxClass: 'bg-white text-gray-800', delay: '100', desc: 'Super FabLab established in technical collaboration with Fab Foundation MIT USA for digital fabrication and robotics.' },
    { title: 'FBOAES Heritage & Top Tier Placements', icon: 'fas fa-building-columns', iconBoxClass: 'bg-gray-200 text-gray-700', delay: '200', desc: 'Founded by Federal Bank Officers Association Educational Society with recruitment by TCS, Infosys, IBM, UST & Federal Bank.' }
  ];

  $scope.fisatDepartments = [
    { name: 'Computer Science & Engineering', code: 'CSE', desc: 'B.Tech, M.Tech AI & Data Science, and Ph.D. research programs.', icon: 'fa-laptop-code' },
    { name: 'Electronics & Communication', code: 'ECE', desc: 'VLSI, Embedded Systems, and Signal Processing research centers.', icon: 'fa-microchip' },
    { name: 'Electrical & Electronics', code: 'EEE', desc: 'Power Systems, Renewable Energy, and Smart Grid Innovation Lab.', icon: 'fa-bolt' },
    { name: 'Mechanical & Civil Engineering', code: 'ME/CE', desc: 'Advanced Robotics, CAD/CAM Manufacturing, and Structural Testing.', icon: 'fa-gears' },
    { name: 'FISAT Business School (FBS)', code: 'MBA', desc: 'AICTE approved MBA with specialization in Finance, Marketing, HR & Operations.', icon: 'fa-chart-line' },
    { name: 'Computer Applications', code: 'MCA', desc: 'Postgraduate Software Engineering, Cloud Architectures, and Full Stack Dev.', icon: 'fa-code' }
  ];

  $scope.searchNotice = '';
  $scope.selectedNoticeDept = '';
  $scope.departments = ['Administration', 'Computer Science', 'Academic Cell', 'Electronics & Comm'];

  $scope.setNoticeDept = function(dept) { $scope.selectedNoticeDept = dept; };
  $scope.filterNoticeByDept = function(notice) {
    return (!$scope.selectedNoticeDept || $scope.selectedNoticeDept === '') ? true : notice.department === $scope.selectedNoticeDept;
  };

  $scope.notices = [
    { id: 1, title: "KTU End Semester Examination Schedule (FISAT Autonomous Batch)", department: "Administration", date: new Date(2026, 6, 24), priority: "High", desc: "The official timetable for MCA S3 & B.Tech End Semester Examinations is now available on the FISAT Student Portal. Hall tickets available for download." },
    { id: 2, title: "FISAT FabLab Innovation Challenge 2026 Registration Open", department: "Computer Science", date: new Date(2026, 6, 22), priority: "High", desc: "All MCA and B.Tech students are invited to register teams for the 48-Hour Hardware-Software Hackathon at FISAT Super FabLab." },
    { id: 3, title: "TCS Digital & Ninja Campus Placement Drive Notice", department: "Academic Cell", date: new Date(2026, 6, 20), priority: "Medium", desc: "Pre-placement talk and online aptitude evaluation for 2025-2027 graduating MCA & B.Tech batches scheduled on August 5 in FISAT Auditorium." },
    { id: 4, title: "Guest Lecture on Edge AI & Neuromorphic Computing", department: "Electronics & Comm", date: new Date(2026, 6, 18), priority: "Low", desc: "Distinguished IEEE lecture by Dr. K. Radhakrishnan in the Main Conference Hall, Hormis Nagar Campus." }
  ];

  $scope.eventBanner = { day: '22', month: 'Aug', title: 'FISAT TECHNO-CULTURAL FESTIVAL: NAUTICA 2026', desc: 'Annual national inter-collegiate technical symposium and cultural fiesta hosted at FISAT Hormis Nagar Campus, Angamaly.', countdown: 'Starts in 4 weeks' };
  $scope.selectedEventCategory = 'All Events';
  $scope.eventCategories = ['All Events', 'Hackathons', 'Conferences', 'Conclaves'];

  $scope.setEventCategory = function(cat) { $scope.selectedEventCategory = cat; };
  $scope.filterEventByCategory = function(ev) {
    if (!$scope.selectedEventCategory || $scope.selectedEventCategory === 'All Events') return true;
    if ($scope.selectedEventCategory === 'Hackathons') return ev.name.indexOf('Hackathon') !== -1;
    if ($scope.selectedEventCategory === 'Conferences') return ev.name.indexOf('Conference') !== -1;
    if ($scope.selectedEventCategory === 'Conclaves') return ev.name.indexOf('Conclave') !== -1;
    return true;
  };

  $scope.rsvpEvent = function() {
    $scope.rsvped = !$scope.rsvped;
    $scope.triggerToast($scope.rsvped ? 'RSVP Confirmed for FISAT NAUTICA 2026!' : 'RSVP Cancelled.');
  };

  $scope.eventsList = [
    { id: 101, name: "FISAT FabLab Hackathon: AI & IoT Hardware Challenge", date: new Date(2026, 7, 18), venue: "FISAT Super FabLab - Hormis Nagar", organizer: "FISAT IEEE & ACM Student Chapters", availableSeats: 35, totalSeats: 80, img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80" },
    { id: 102, name: "National Conference on Emerging Engineering Tech (NCEET)", date: new Date(2026, 7, 24), venue: "FISAT Main Auditorium, Angamaly", organizer: "R&D Cell, FISAT Angamaly", availableSeats: 120, totalSeats: 200, img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80" },
    { id: 103, name: "FISAT Business School (FBS) Leadership Conclave", date: new Date(2026, 7, 30), venue: "FBS Seminar Hall", organizer: "FISAT Business School Management Association", availableSeats: 25, totalSeats: 100, img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80" }
  ];

  $scope.registrationForm = { studentName: 'Allen John Joy', email: 'allenjohn@gmail.com', phone: '', selectedEvent: null, semester: '3', agreeTerms: false };
  $scope.eventRegistrations = [{ id: 1, studentName: "Allen John Joy", email: "allenjohn@gmail.com", phone: "9876543210", eventName: "FISAT FabLab Hackathon: AI & IoT Hardware Challenge", regDate: new Date(2026, 6, 24) }];

  $scope.submitEventRegistration = function(regFormRef) {
    if (regFormRef && regFormRef.$invalid) {
      $scope.triggerToast('Please fill out all required fields (Select Event, Student Name, Email, 10-digit Phone) before submitting.');
      return;
    }
    if (regFormRef && regFormRef.$valid && $scope.registrationForm.selectedEvent) {
      var ev = $scope.registrationForm.selectedEvent;
      if (ev.availableSeats > 0) {
        ev.availableSeats--;
        $scope.eventRegistrations.unshift({
          id: Date.now(),
          studentName: $scope.registrationForm.studentName || ($scope.studentProfile ? $scope.studentProfile.name : 'Student'),
          email: $scope.registrationForm.email || ($scope.studentProfile ? $scope.studentProfile.email : 'allenjohn@gmail.com'),
          phone: $scope.registrationForm.phone,
          eventName: ev.name,
          regDate: new Date()
        });
        $scope.triggerToast('Registration confirmed for ' + ev.name + ' at FISAT!');
        $scope.registrationForm = {
          studentName: $scope.studentProfile ? $scope.studentProfile.name : 'Allen John Joy',
          email: $scope.studentProfile ? $scope.studentProfile.email : 'allenjohn@gmail.com',
          phone: '',
          selectedEvent: null,
          semester: '3',
          agreeTerms: false
        };
        regFormRef.$setPristine();
        regFormRef.$setUntouched();
      } else {
        $scope.triggerToast('Sorry, no seats available for this event.');
      }
    } else if (!$scope.registrationForm.selectedEvent) {
      $scope.triggerToast('Please select an event from the dropdown to complete registration.');
    }
  };

  $scope.lostFoundFilter = 'All';
  $scope.lostFoundItems = [
    { id: 1, name: "Apple MacBook Air M2 (Space Gray)", category: "Electronics", dateFound: new Date(2026, 6, 24), location: "FISAT Central Library - 2nd Floor", status: "Lost", contact: "allenjohn@gmail.com", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop&q=80" },
    { id: 2, name: "Leather Wallet with FISAT Student ID Card", category: "Accessories", dateFound: new Date(2026, 6, 22), location: "FISAT Student Canteen Complex", status: "Lost", contact: "canteen@fisat.ac.in", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&auto=format&fit=crop&q=80" },
    { id: 3, name: "Casio FX-991EX ClassWiz Scientific Calculator", category: "Electronics", dateFound: new Date(2026, 6, 20), location: "APJ Abdul Kalam Block Lab 2", status: "Lost", contact: "mca.dept@fisat.ac.in", img: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400&auto=format&fit=crop&q=80" },
    { id: 4, name: "Titan Automatic Analog Watch (Black Strap)", category: "Accessories", dateFound: new Date(2026, 6, 18), location: "FISAT Sports Complex Auditorium", status: "Lost", contact: "sports@fisat.ac.in", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80" }
  ];

  $scope.contactAdminRetrieval = function(item) {
    $scope.triggerToast('Retrieval request for "' + item.name + '" submitted to FISAT Admin Office (admin@fisat.ac.in).');
  };

  $scope.showAddLostFoundModal = false;
  $scope.newLostFoundItem = { name: '', category: 'Electronics', location: '', contact: '', img: '' };

  $scope.openAddLostFoundModal = function() {
    $scope.newLostFoundItem = {
      name: '',
      category: 'Electronics',
      location: '',
      contact: ($scope.studentProfile && $scope.studentProfile.email) ? $scope.studentProfile.email : 'allenjohn@gmail.com',
      img: ''
    };
    $scope.showAddLostFoundModal = true;
  };

  $scope.closeAddLostFoundModal = function() {
    $scope.showAddLostFoundModal = false;
  };

  $scope.addLostFoundItem = function(formRef) {
    if (formRef && formRef.$invalid) return;
    var defaultImg = 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400&auto=format&fit=crop&q=80';
    var newItemObj = {
      id: Date.now(),
      name: $scope.newLostFoundItem.name.trim(),
      category: $scope.newLostFoundItem.category,
      dateFound: new Date(),
      location: $scope.newLostFoundItem.location.trim(),
      status: 'Lost',
      contact: $scope.newLostFoundItem.contact.trim(),
      img: $scope.newLostFoundItem.img ? $scope.newLostFoundItem.img.trim() : defaultImg
    };
    $scope.lostFoundItems.unshift(newItemObj);
    $scope.showAddLostFoundModal = false;
    $scope.triggerToast('New item "' + newItemObj.name + '" registered! Contact FISAT Admin for verification.');
    if (formRef) {
      formRef.$setPristine();
      formRef.$setUntouched();
    }
  };

  $scope.selectedMarketCategory = 'All';
  $scope.marketplaceCategories = ['All', 'Books', 'Electronics', 'Lab Equipment', 'Accessories'];
  $scope.setMarketCategory = function(cat) { $scope.selectedMarketCategory = cat; };
  $scope.filterMarketplace = function(prod) {
    return (!$scope.selectedMarketCategory || $scope.selectedMarketCategory === 'All') ? true : prod.category === $scope.selectedMarketCategory;
  };

  $scope.marketplaceItems = [
    { id: 1, name: "Advanced Java & Cloud Computing (MCA S3 Coursework)", category: "Books", sellerName: "Allen John Joy", price: 250, contact: "allenjohn@gmail.com", condition: "Like New", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80" },
    { id: 2, name: "Arduino Mega & Sensor Starter Kit (Robotics)", category: "Lab Equipment", sellerName: "Ananya Nair", price: 1450, contact: "ananya.n@fisat.ac.in", condition: "Brand New", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80" },
    { id: 3, name: "Dell 24-inch IPS Monitor for Coding & Design", category: "Electronics", sellerName: "Kiran Paul", price: 6500, contact: "kiran.p@fisat.ac.in", condition: "Good", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80" },
    { id: 4, name: "Ergonomic Mesh Study Chair for Hostel Room", category: "Accessories", sellerName: "Siddharth V.", price: 2200, contact: "siddharth.v@fisat.ac.in", condition: "Used", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=80" }
  ];

  $scope.showAddMarketplaceModal = false;
  $scope.newMarketItem = { name: '', category: 'Books', price: 100, condition: 'Like New', contact: '', img: '' };

  $scope.openAddMarketplaceModal = function() {
    $scope.newMarketItem = {
      name: '',
      category: 'Books',
      price: 100,
      condition: 'Like New',
      contact: ($scope.studentProfile && $scope.studentProfile.email) ? $scope.studentProfile.email : 'allenjohn@gmail.com',
      img: ''
    };
    $scope.showAddMarketplaceModal = true;
  };

  $scope.closeAddMarketplaceModal = function() {
    $scope.showAddMarketplaceModal = false;
  };

  $scope.addMarketplaceItem = function(formRef) {
    if (formRef && formRef.$invalid) return;
    var defaultImg = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80';
    var newItemObj = {
      id: Date.now(),
      name: $scope.newMarketItem.name.trim(),
      category: $scope.newMarketItem.category,
      sellerName: ($scope.studentProfile && $scope.studentProfile.name) ? $scope.studentProfile.name : 'Allen John Joy',
      price: parseFloat($scope.newMarketItem.price) || 100,
      contact: $scope.newMarketItem.contact.trim(),
      condition: $scope.newMarketItem.condition,
      img: $scope.newMarketItem.img ? $scope.newMarketItem.img.trim() : defaultImg
    };
    $scope.marketplaceItems.unshift(newItemObj);
    $scope.showAddMarketplaceModal = false;
    $scope.triggerToast('Product "' + newItemObj.name + '" listed successfully in Marketplace!');
    if (formRef) {
      formRef.$setPristine();
      formRef.$setUntouched();
    }
  };

  $scope.searchPlacement = '';
  $scope.placements = [
    { id: 1, companyName: "TCS Digital / Ninja", jobRole: "Systems Engineer & Software Developer", eligibility: "MCA & B.Tech CSE/ECE > 7.5 CGPA", interviewDate: new Date(2026, 7, 18), deadline: new Date(2026, 7, 10), package: "₹7.0 LPA / yr", logo: "TCS", applied: false },
    { id: 2, companyName: "Federal Bank Limited", jobRole: "Management Trainee (IT & FinTech)", eligibility: "MCA, MBA & B.Tech Graduates > 7.0 CGPA", interviewDate: new Date(2026, 7, 22), deadline: new Date(2026, 7, 15), package: "₹12.0 LPA / yr", logo: "FB", applied: true },
    { id: 3, companyName: "IBM Software Labs", jobRole: "Cloud & Full Stack Software Engineer", eligibility: "MCA & B.Tech Batches", interviewDate: new Date(2026, 7, 29), deadline: new Date(2026, 7, 20), package: "₹10.5 LPA / yr", logo: "IBM", applied: false }
  ];

  $scope.applyPlacement = function(p) {
    p.applied = true;
    $scope.triggerToast('Application submitted to ' + p.companyName + ' for ' + p.jobRole);
  };

  $scope.resourceCategories = [
    'All Categories',
    'Subject Notes',
    'Previous Year Question Papers',
    'Lab Manuals',
    'Study Materials',
    'Syllabus & Curriculum',
    'Project & Internship Guides',
    'Reference E-Books',
    'Question Banks & Answer Keys'
  ];
  $scope.resourceDepartments = ['All Departments', 'MCA', 'CSE', 'ECE', 'EEE', 'ME/CE', 'MBA'];
  $scope.resourceSemesters = ['All Semesters', 'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];

  $scope.selectedResourceCategory = 'All Categories';
  $scope.selectedResourceDept = 'All Departments';
  $scope.selectedResourceSem = 'All Semesters';
  $scope.searchResourceQuery = '';

  $scope.selectResourceCategory = function(cat) {
    $scope.selectedResourceCategory = cat;
  };

  $scope.clearResourceFilters = function() {
    $scope.selectedResourceCategory = 'All Categories';
    $scope.selectedResourceDept = 'All Departments';
    $scope.selectedResourceSem = 'All Semesters';
    $scope.searchResourceQuery = '';
  };

  $scope.academicResources = [
    // Subject Notes
    { id: 1, title: "MCA Semester 3 Advanced Java & Spring Boot Core Notes", category: "Subject Notes", subject: "RLMCA201", department: "MCA", semester: "Semester 3", fileFormat: "PDF", size: "14.2 MB", downloads: 412, author: "Dept. of Computer Applications" },
    { id: 2, title: "B.Tech CSE Sem 5 Design & Analysis of Algorithms Notes", category: "Subject Notes", subject: "CST301", department: "CSE", semester: "Semester 5", fileFormat: "PDF", size: "11.5 MB", downloads: 538, author: "Prof. Rajesh Kumar" },
    { id: 3, title: "ECE Sem 4 Signals & Systems Comprehensive Lecture Notes", category: "Subject Notes", subject: "ECT204", department: "ECE", semester: "Semester 4", fileFormat: "PDF", size: "9.8 MB", downloads: 310, author: "Dept. of ECE" },
    { id: 4, title: "MBA Sem 2 Financial Management & Accounting Notes", category: "Subject Notes", subject: "MBT202", department: "MBA", semester: "Semester 2", fileFormat: "PDF", size: "7.3 MB", downloads: 275, author: "FISAT Business School" },
    { id: 5, title: "EEE Sem 5 Power Systems & Smart Grid Engineering Notes", category: "Subject Notes", subject: "EET301", department: "EEE", semester: "Semester 5", fileFormat: "PDF", size: "12.4 MB", downloads: 198, author: "Dept. of EEE" },

    // Previous Year Question Papers
    { id: 6, title: "KTU MCA End-Sem Question Paper Archive (2022-2025)", category: "Previous Year Question Papers", subject: "RLMCA203", department: "MCA", semester: "Semester 3", fileFormat: "PDF", size: "18.5 MB", downloads: 842, author: "KTU Examination Cell" },
    { id: 7, title: "KTU B.Tech CSE Database Management Systems Solved PYQs", category: "Previous Year Question Papers", subject: "CST204", department: "CSE", semester: "Semester 4", fileFormat: "PDF", size: "8.2 MB", downloads: 620, author: "CSE Student Association" },
    { id: 8, title: "KTU EEE Electrical Machines II Solved Past Papers", category: "Previous Year Question Papers", subject: "EET302", department: "EEE", semester: "Semester 5", fileFormat: "PDF", size: "10.1 MB", downloads: 345, author: "EEE Department" },
    { id: 9, title: "KTU MBA Semester 1 Organizational Behavior Solved Papers", category: "Previous Year Question Papers", subject: "MBT101", department: "MBA", semester: "Semester 1", fileFormat: "PDF", size: "6.8 MB", downloads: 290, author: "FBS Archive" },

    // Lab Manuals
    { id: 10, title: "FISAT Cloud Computing & DevOps Lab Manual 2026", category: "Lab Manuals", subject: "RLMCA231", department: "MCA", semester: "Semester 3", fileFormat: "PDF", size: "8.5 MB", downloads: 389, author: "FISAT Super FabLab" },
    { id: 11, title: "Data Structures & Algorithms C/C++ Lab Manual", category: "Lab Manuals", subject: "CSL201", department: "CSE", semester: "Semester 3", fileFormat: "PDF", size: "6.4 MB", downloads: 495, author: "CSE Lab Incharge" },
    { id: 12, title: "VLSI Circuit Design & Cadence Tool Simulation Lab Guide", category: "Lab Manuals", subject: "ECL332", department: "ECE", semester: "Semester 6", fileFormat: "PDF", size: "15.1 MB", downloads: 215, author: "ECE VLSI Lab" },
    { id: 13, title: "AutoCAD & Building Information Modeling (BIM) Lab Guide", category: "Lab Manuals", subject: "CEL204", department: "ME/CE", semester: "Semester 4", fileFormat: "PDF", size: "11.2 MB", downloads: 180, author: "Dept. of Civil Engg" },

    // Study Materials
    { id: 14, title: "Design & Analysis of Algorithms Quick Revision Guide", category: "Study Materials", subject: "RLMCA205", department: "MCA", semester: "Semester 3", fileFormat: "DOCX", size: "5.8 MB", downloads: 430, author: "Academic Cell" },
    { id: 15, title: "Machine Learning & Deep Learning Formula Cheat Sheet", category: "Study Materials", subject: "CST401", department: "CSE", semester: "Semester 7", fileFormat: "PDF", size: "4.2 MB", downloads: 710, author: "AI Research Hub" },
    { id: 16, title: "Python Programming for Data Science Fast-Track Handbook", category: "Study Materials", subject: "EST102", department: "CSE", semester: "Semester 2", fileFormat: "PDF", size: "6.9 MB", downloads: 540, author: "Coding Club FISAT" },

    // Syllabus & Curriculum
    { id: 17, title: "KTU Master of Computer Applications (MCA) 2024 Scheme Syllabus", category: "Syllabus & Curriculum", subject: "KTU-MCA-SCHEME", department: "MCA", semester: "Semester 1", fileFormat: "PDF", size: "3.5 MB", downloads: 915, author: "KTU Academic Council" },
    { id: 18, title: "KTU B.Tech Computer Science & Engineering Curriculum Blueprint", category: "Syllabus & Curriculum", subject: "KTU-CSE-SCHEME", department: "CSE", semester: "Semester 1", fileFormat: "PDF", size: "4.1 MB", downloads: 1120, author: "KTU Academic Council" },

    // Project & Internship Guides
    { id: 19, title: "FISAT MCA Main Project Report Template & IEEE Format Guide", category: "Project & Internship Guides", subject: "RLMCA351", department: "MCA", semester: "Semester 4", fileFormat: "DOCX", size: "2.8 MB", downloads: 680, author: "PG Project Committee" },
    { id: 20, title: "B.Tech CSE Mini-Project Architecture & Git Starter Repository", category: "Project & Internship Guides", subject: "CSD334", department: "CSE", semester: "Semester 6", fileFormat: "ZIP", size: "22.4 MB", downloads: 512, author: "Software Engineering Lab" },

    // Reference E-Books
    { id: 21, title: "Operating System Concepts (Silberschatz) Reference Summary", category: "Reference E-Books", subject: "CST206", department: "CSE", semester: "Semester 4", fileFormat: "PDF", size: "16.8 MB", downloads: 445, author: "Central Library FISAT" },
    { id: 22, title: "Artificial Intelligence: A Modern Approach Study Pack", category: "Reference E-Books", subject: "CST402", department: "CSE", semester: "Semester 7", fileFormat: "PDF", size: "21.0 MB", downloads: 610, author: "Central Library FISAT" },

    // Question Banks & Answer Keys
    { id: 23, title: "Object Oriented Programming in Java Question Bank with Solutions", category: "Question Banks & Answer Keys", subject: "RLMCA202", department: "MCA", semester: "Semester 2", fileFormat: "PDF", size: "9.5 MB", downloads: 525, author: "Exam Preparation Cell" },
    { id: 24, title: "Computer Networks Model Question Papers with Detailed Answer Key", category: "Question Banks & Answer Keys", subject: "CST303", department: "CSE", semester: "Semester 5", fileFormat: "PDF", size: "7.8 MB", downloads: 390, author: "Dept. of CSE" }
  ];

  $scope.downloadResource = function(res) {
    res.downloads++;
    $scope.triggerToast('Downloading ' + res.title + ' (' + res.size + ')...');
  };

  $scope.filterResourceByCategory = function(res) {
    var matchesCategory = (!$scope.selectedResourceCategory || $scope.selectedResourceCategory === 'All Categories') ? true : res.category === $scope.selectedResourceCategory;
    var matchesDept = (!$scope.selectedResourceDept || $scope.selectedResourceDept === 'All Departments') ? true : res.department === $scope.selectedResourceDept;
    var matchesSem = (!$scope.selectedResourceSem || $scope.selectedResourceSem === 'All Semesters') ? true : res.semester === $scope.selectedResourceSem;
    var matchesSearch = true;
    if ($scope.searchResourceQuery && $scope.searchResourceQuery.trim() !== '') {
      var q = $scope.searchResourceQuery.toLowerCase().trim();
      matchesSearch = (res.title && res.title.toLowerCase().indexOf(q) !== -1) ||
                      (res.subject && res.subject.toLowerCase().indexOf(q) !== -1) ||
                      (res.category && res.category.toLowerCase().indexOf(q) !== -1) ||
                      (res.department && res.department.toLowerCase().indexOf(q) !== -1) ||
                      (res.fileFormat && res.fileFormat.toLowerCase().indexOf(q) !== -1);
    }
    return matchesCategory && matchesDept && matchesSem && matchesSearch;
  };

  $scope.contactForm = { name: 'Allen John Joy', email: 'allenjohn@gmail.com', message: '' };
  $scope.submitContact = function(cntFormRef) {
    if (cntFormRef && cntFormRef.$invalid) {
      $scope.triggerToast('Please fill out all required fields (Name, Email, Inquiry Message) before submitting.');
      return;
    }
    if ($scope.contactForm.name && $scope.contactForm.email && $scope.contactForm.message) {
      $scope.triggerToast('Thank you ' + $scope.contactForm.name + '! Your inquiry has been sent to FISAT Admin.');
      $scope.contactForm.message = '';
      if (cntFormRef) {
        cntFormRef.$setPristine();
        cntFormRef.$setUntouched();
      }
    } else {
      $scope.triggerToast('Please fill out all required inquiry fields marked with *.');
    }
  };

  $scope.newsletterEmail = '';
  $scope.subscribeNewsletter = function(newsFormRef) {
    if (newsFormRef && newsFormRef.$invalid) {
      $scope.triggerToast('Please enter a valid email address to subscribe.');
      return;
    }
    if ($scope.newsletterEmail) {
      $scope.triggerToast('Subscribed to FISAT Institutional Updates with ' + $scope.newsletterEmail + '!');
      $scope.newsletterEmail = '';
      if (newsFormRef) {
        newsFormRef.$setPristine();
        newsFormRef.$setUntouched();
      }
    } else {
      $scope.triggerToast('Please enter your email address to subscribe.');
    }
  };
}]);
