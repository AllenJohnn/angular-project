var app = angular.module('campusConnectApp', []);

app.controller('MainController', ['$scope', function($scope) {
    $scope.activeTab = 'home';
    $scope.isDarkTheme = false;
    $scope.searchQuery = '';
    $scope.notification = null;

    $scope.portalInfo = {
        institutionName: 'Federal Institute of Science and Technology (FISAT)',
        portalName: 'FISAT CampusConnect',
        shortName: 'FISAT MCA',
        location: 'Hormis Nagar, Mookkannoor, Angamaly, Kerala',
        academicYear: '2025–2026',
        currentTerm: 'Even Semester (Spring 2026)',
        teamName: 'Ultriod',
        teamLeader: 'Allen John Joy',
        guide: 'Prof. Shahid Khan',
        department: 'Department of Computer Applications (MCA)',
        program: 'Master of Computer Applications (MCA)',
        studentProfile: {
            name: 'Allen John Joy',
            rollNumber: 'FIT24MCA001',
            program: 'MCA (2nd Year)',
            semester: 'Semester IV',
            cgpa: 8.85,
            attendance: '94.2%',
            email: 'allen.joy@fisat.ac.in'
        },
        teamMembers: [
            { name: 'Allen John Joy', role: 'Team Leader', id: 'FIT24MCA001' },
            { name: 'Neeha Nazer', role: 'UI/UX Developer', id: 'FIT24MCA015' },
            { name: 'Nikhil Eashy', role: 'Frontend Dev', id: 'FIT24MCA018' },
            { name: 'P. U. Athul Krishna', role: 'Data Dev', id: 'FIT24MCA022' }
        ]
    };

    $scope.setActiveTab = function(tab) {
        $scope.activeTab = tab;
    };

    $scope.enterPortal = function() {
        $scope.activeTab = 'dashboard';
        $scope.showNotification('Welcome, ' + $scope.portalInfo.studentProfile.name + '! Logged into FISAT MCA Portal.', 'success');
    };

    $scope.toggleTheme = function() {
        $scope.isDarkTheme = !$scope.isDarkTheme;
        $scope.showNotification($scope.isDarkTheme ? 'Dark Mode Enabled' : 'Light Mode Enabled', 'info');
    };

    $scope.showNotification = function(msg, type) {
        $scope.notification = { message: msg, type: type || 'success' };
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.notification = null;
            });
        }, 4000);
    };

    $scope.noticeFilterPriority = '';
    $scope.noticeFilterDept = '';
    $scope.noticeSearchText = '';
    $scope.showNoticeModal = false;

    $scope.departmentsList = [
        'All Departments',
        'Department of Computer Applications (MCA)',
        'MCA Exam Controller & Academic Cell',
        'FISAT Placement & Training Cell (MCA Desk)',
        'MCA Department Library & Resource Desk',
        'Department of Computer Science & Engg (CSE)',
        'Department of Electronics & Comm Engg (ECE)'
    ];

    $scope.notices = [
        {
            id: 101,
            circularNo: 'FISAT/MCA/2026/CIRC-084',
            title: 'KTU S4 MCA End-Semester Theory & Practical Examination Timetable',
            department: 'Department of Computer Applications (MCA)',
            date: new Date('2026-08-01'),
            priority: 'High',
            description: 'APJ Abdul Kalam Technological University (KTU) MCA S4 theory & lab viva-voce timetable published. Download hall tickets from MCA portal.',
            pinned: true
        },
        {
            id: 102,
            circularNo: 'FISAT/MCA/2026/DRIVE-019',
            title: 'Special Campus Recruitment Drive for MCA: TCS Digital & Cognizant',
            department: 'FISAT Placement & Training Cell (MCA Desk)',
            date: new Date('2026-07-28'),
            priority: 'High',
            description: 'Exclusive placement drive for final-year MCA students by TCS Digital, Cognizant GenC, and Infosys Power Programmer on August 4.',
            pinned: true
        },
        {
            id: 103,
            circularNo: 'FISAT/MCA/2026/ACAD-042',
            title: 'MCA Semester IV Main Project Report Submission & Viva-Voce',
            department: 'Department of Computer Applications (MCA)',
            date: new Date('2026-07-25'),
            priority: 'Medium',
            description: 'All 4th Semester MCA students submit hardbound project reports to MCA Department Office by August 5 under Prof. Shahid Khan.',
            pinned: false
        },
        {
            id: 104,
            circularNo: 'FISAT/MCA/2026/LAB-012',
            title: 'MCA Computer Lab 3 (Web Systems & Cloud Lab) Extended Operating Hours',
            department: 'Department of Computer Applications (MCA)',
            date: new Date('2026-07-22'),
            priority: 'Low',
            description: 'MCA Lab 3 & Fab Lab will remain open until 22:00 hrs on all working days for MCA final project development.',
            pinned: false
        },
        {
            id: 105,
            circularNo: 'FISAT/MCA/2026/SEMINAR-008',
            title: 'MCA Department Alumni Seminar: Enterprise Microservices & AngularJS',
            department: 'Department of Computer Applications (MCA)',
            date: new Date('2026-07-20'),
            priority: 'Medium',
            description: 'Interactive technical workshop hosted by MCA Alumni Association in the MCA Seminar Hall.',
            pinned: false
        }
    ];

    $scope.newNotice = {
        title: '',
        circularNo: '',
        department: 'Department of Computer Applications (MCA)',
        priority: 'Medium',
        description: '',
        pinned: false
    };

    $scope.addNotice = function() {
        if (!$scope.newNotice.title || !$scope.newNotice.description) return;
        var generatedRef = 'FISAT/MCA/' + new Date().getFullYear() + '/CIRC-' + Math.floor(100 + Math.random() * 900);
        $scope.notices.unshift({
            id: Date.now(),
            circularNo: $scope.newNotice.circularNo || generatedRef,
            title: $scope.newNotice.title,
            department: $scope.newNotice.department,
            date: new Date(),
            priority: $scope.newNotice.priority,
            description: $scope.newNotice.description,
            pinned: $scope.newNotice.pinned
        });
        $scope.newNotice = { title: '', circularNo: '', department: 'Department of Computer Applications (MCA)', priority: 'Medium', description: '', pinned: false };
        $scope.showNoticeModal = false;
        $scope.showNotification('MCA Circular published successfully.', 'success');
    };

    $scope.eventCategoryFilter = 'All';
    $scope.selectedEvent = null;
    $scope.showEventModal = false;

    $scope.eventCategories = ['All', 'Technical', 'MCA Workshops', 'Placement Drives', 'Department Events'];

    $scope.events = [
        {
            id: 201,
            code: 'FISAT-MCA-EVT-01',
            name: 'Phase Shift 2026: National IT & Coding Symposium (Organized by MCA Dept)',
            date: new Date('2026-08-05'),
            venue: 'MCA Seminar Hall & Main Auditorium',
            organizer: 'Department of Computer Applications (MCA)',
            totalSeats: 160,
            bookedSeats: 128,
            category: 'Technical',
            description: 'Flagship national technical fest featuring competitive coding, web architecture hackathons, and paper presentations.'
        },
        {
            id: 202,
            code: 'FISAT-MCA-EVT-02',
            name: 'Hands-on Workshop: Enterprise Web Application Engineering & AngularJS',
            date: new Date('2026-08-10'),
            venue: 'MCA Computer Lab 3 (Workstation Hall)',
            organizer: 'Prof. Shahid Khan (MCA Dept)',
            totalSeats: 90,
            bookedSeats: 86,
            category: 'MCA Workshops',
            description: 'Comprehensive bootcamp covering AngularJS single-page applications, custom directives, and enterprise frontend architecture.'
        },
        {
            id: 203,
            code: 'FISAT-MCA-EVT-03',
            name: 'MCA Department Alumni Tech Talk: Cloud Microservices & DevOps',
            date: new Date('2026-08-18'),
            venue: 'MCA Block Conference Hall',
            organizer: 'MCA Alumni Association',
            totalSeats: 120,
            bookedSeats: 94,
            category: 'Department Events',
            description: 'Industry insights on distributed systems, container orchestration, and career growth for MCA graduates.'
        },
        {
            id: 204,
            code: 'FISAT-MCA-EVT-04',
            name: 'Inter-Departmental Hackathon Championship (Hosted by MCA)',
            date: new Date('2026-08-25'),
            venue: 'Fab Lab & MCA Computing Facility',
            organizer: 'MCA Association (Ultriod Team)',
            totalSeats: 200,
            bookedSeats: 175,
            category: 'Technical',
            description: '24-hour coding challenge building smart campus solutions and web portals.'
        }
    ];

    $scope.registeredStudents = [
        { eventCode: 'FISAT-MCA-EVT-01', eventName: 'Phase Shift IT Symposium', studentName: 'Allen John Joy', studentId: 'FIT24MCA001', email: 'allen.joy@fisat.ac.in', phone: '9876543210', department: 'Department of Computer Applications (MCA)', year: '2nd Year', regDate: new Date('2026-07-21') },
        { eventCode: 'FISAT-MCA-EVT-02', eventName: 'AngularJS Web Engineering Workshop', studentName: 'Neeha Nazer', studentId: 'FIT24MCA015', email: 'neeha.nazer@fisat.ac.in', phone: '9876543215', department: 'Department of Computer Applications (MCA)', year: '2nd Year', regDate: new Date('2026-07-22') },
        { eventCode: 'FISAT-MCA-EVT-04', eventName: 'Inter-Departmental Hackathon', studentName: 'Nikhil Eashy', studentId: 'FIT24MCA018', email: 'nikhil.eashy@fisat.ac.in', phone: '9876543211', department: 'Department of Computer Applications (MCA)', year: '2nd Year', regDate: new Date('2026-07-23') }
    ];

    $scope.regForm = {
        eventId: null,
        studentName: '',
        studentId: '',
        email: '',
        phone: '',
        department: 'Department of Computer Applications (MCA)',
        year: '2nd Year',
        comments: '',
        agreeTerms: false
    };

    $scope.openRegistrationModal = function(evt) {
        $scope.selectedEvent = evt;
        $scope.regForm.eventId = evt.id;
        $scope.showEventModal = true;
    };

    $scope.submitRegistration = function(form) {
        if (form.$invalid) return;
        var evt = $scope.events.find(function(e) { return e.id === $scope.selectedEvent.id; });
        if (evt && evt.bookedSeats < evt.totalSeats) {
            evt.bookedSeats++;
            $scope.registeredStudents.unshift({
                eventCode: evt.code,
                eventName: evt.name,
                studentName: $scope.regForm.studentName,
                studentId: $scope.regForm.studentId,
                email: $scope.regForm.email,
                phone: $scope.regForm.phone,
                department: $scope.regForm.department,
                year: $scope.regForm.year,
                regDate: new Date()
            });
            $scope.showNotification('Registration confirmed for ' + evt.code + '.', 'success');
            $scope.showEventModal = false;
            $scope.regForm = {
                eventId: null,
                studentName: '',
                studentId: '',
                email: '',
                phone: '',
                department: 'Department of Computer Applications (MCA)',
                year: '2nd Year',
                comments: '',
                agreeTerms: false
            };
            form.$setPristine();
            form.$setUntouched();
        } else {
            $scope.showNotification('Registration failed: Event full.', 'warning');
        }
    };

    $scope.lostFoundStatusFilter = 'All';
    $scope.showLostFoundModal = false;

    $scope.lostAndFound = [
        {
            id: 301,
            itemRef: 'FISAT-LF-089',
            title: 'Casio FX-991EX ClassWiz Scientific Calculator',
            category: 'Electronics',
            dateFound: new Date('2026-07-22'),
            location: 'MCA Computer Lab 3 (Workstation 12)',
            status: 'Found',
            contactPerson: 'Mr. Ramesh Kumar (MCA Lab Asst)',
            phone: '0484-2725272',
            description: 'Found on MCA Lab 3 workstation desk after practical exam.'
        },
        {
            id: 302,
            itemRef: 'FISAT-LF-092',
            title: 'FISAT MCA Student Lanyard & RFID Access Badge',
            category: 'Documents',
            dateFound: new Date('2026-07-23'),
            location: 'MCA Department Library Annex',
            status: 'Lost',
            contactPerson: 'Neeha Nazer (FIT24MCA015)',
            phone: '9876543215',
            description: 'Navy FISAT lanyard with RFID card misplaced near MCA Department Office.'
        },
        {
            id: 303,
            itemRef: 'FISAT-LF-078',
            title: 'Web Programming & AngularJS Textbook (Prof. Shahid Khan)',
            category: 'Books',
            dateFound: new Date('2026-07-20'),
            location: 'MCA Seminar Hall (Row B)',
            status: 'Found',
            contactPerson: 'MCA Dept Office',
            phone: '0484-2725273',
            description: 'Found on seminar room chair. Hardbound copy with notes.'
        }
    ];

    $scope.newItem = {
        title: '',
        category: 'Electronics',
        dateFound: new Date(),
        location: '',
        status: 'Lost',
        contactPerson: '',
        phone: '',
        description: ''
    };

    $scope.addLostFoundItem = function() {
        if (!$scope.newItem.title || !$scope.newItem.location || !$scope.newItem.contactPerson) return;
        var refCode = 'FISAT-LF-' + Math.floor(100 + Math.random() * 900);
        $scope.lostAndFound.unshift({
            id: Date.now(),
            itemRef: refCode,
            title: $scope.newItem.title,
            category: $scope.newItem.category,
            dateFound: new Date($scope.newItem.dateFound),
            location: $scope.newItem.location,
            status: $scope.newItem.status,
            contactPerson: $scope.newItem.contactPerson,
            phone: $scope.newItem.phone,
            description: $scope.newItem.description
        });
        $scope.showNotification('Item report saved (' + refCode + ').', 'success');
        $scope.showLostFoundModal = false;
        $scope.newItem = {
            title: '',
            category: 'Electronics',
            dateFound: new Date(),
            location: '',
            status: 'Lost',
            contactPerson: '',
            phone: '',
            description: ''
        };
    };

    $scope.marketplaceCategoryFilter = 'All';
    $scope.marketplaceSearch = '';
    $scope.showMarketplaceModal = false;

    $scope.marketplaceCategories = ['All', 'MCA Books', 'Electronics', 'Lab Equipment', 'Accessories'];

    $scope.marketplace = [
        {
            id: 401,
            title: 'KTU MCA Semester 2 & 4 Complete Textbook Bundle',
            category: 'MCA Books',
            sellerName: 'Nikhil Eashy (FIT24MCA018)',
            price: 550,
            condition: 'Good Condition',
            contact: 'nikhil.eashy@fisat.ac.in',
            datePosted: new Date('2026-07-18'),
            badgeClass: 'badge-secondary',
            description: 'Includes Web Programming, DBMS, and Operating Systems reference books.'
        },
        {
            id: 402,
            title: 'Logitech Wireless Keyboard & Laser Mouse (Ideal for MCA Lab)',
            category: 'Electronics',
            sellerName: 'P. U. Athul Krishna (FIT24MCA022)',
            price: 850,
            condition: 'Like New',
            contact: 'athul.krishna@fisat.ac.in',
            datePosted: new Date('2026-07-21'),
            badgeClass: 'badge-secondary',
            description: 'Dual Bluetooth & USB receiver. Excellent for MCA workstation labs.'
        },
        {
            id: 403,
            title: 'Database Systems & Data Structures Reference Hardcovers',
            category: 'MCA Books',
            sellerName: 'Neeha Nazer (FIT24MCA015)',
            price: 600,
            condition: 'Like New',
            contact: 'neeha.nazer@fisat.ac.in',
            datePosted: new Date('2026-07-22'),
            badgeClass: 'badge-secondary',
            description: 'Kurose & Ross 7th Ed and Tanenbaum 5th Ed for MCA curriculum.'
        }
    ];

    $scope.newProduct = {
        title: '',
        category: 'MCA Books',
        sellerName: '',
        price: '',
        condition: 'Good Condition',
        contact: '',
        description: ''
    };

    $scope.addMarketplaceProduct = function() {
        if (!$scope.newProduct.title || !$scope.newProduct.price || !$scope.newProduct.sellerName) return;
        $scope.marketplace.unshift({
            id: Date.now(),
            title: $scope.newProduct.title,
            category: $scope.newProduct.category,
            sellerName: $scope.newProduct.sellerName,
            price: parseFloat($scope.newProduct.price),
            condition: $scope.newProduct.condition,
            contact: $scope.newProduct.contact,
            datePosted: new Date(),
            badgeClass: 'badge-secondary',
            description: $scope.newProduct.description
        });
        $scope.showNotification('Product listed successfully.', 'success');
        $scope.showMarketplaceModal = false;
        $scope.newProduct = {
            title: '',
            category: 'MCA Books',
            sellerName: '',
            price: '',
            condition: 'Good Condition',
            contact: '',
            description: ''
        };
    };

    $scope.placementSearch = '';
    $scope.selectedPlacement = null;
    $scope.showPlacementModal = false;

    $scope.placements = [
        {
            id: 501,
            company: 'TCS Digital / Ninja',
            role: 'Specialist Software Engineer (MCA Target)',
            eligibility: 'FISAT MCA Batch 2026 (CGPA >= 6.50)',
            interviewDate: new Date('2026-08-08'),
            deadline: new Date('2026-08-02'),
            package: '₹7.50 LPA',
            location: 'Kochi / Bengaluru',
            status: 'Registration Open',
            tags: ['Java', 'Spring Boot', 'SQL', 'MCA Eligible'],
            description: 'Full stack software development and web platform engineering for MCA candidates.'
        },
        {
            id: 502,
            company: 'Cognizant (CTS)',
            role: 'Programmer Analyst Trainee (MCA Stream)',
            eligibility: 'FISAT MCA Final Year Students',
            interviewDate: new Date('2026-08-14'),
            deadline: new Date('2026-08-04'),
            package: '₹6.75 LPA',
            location: 'Kochi / Chennai',
            status: 'Registration Open',
            tags: ['Python', 'AngularJS', 'Cloud', 'MCA Target'],
            description: 'Enterprise application engineering, backend APIs, and web software operations.'
        },
        {
            id: 503,
            company: 'Infosys Specialist Unit',
            role: 'Power Programmer (MCA Postgraduates)',
            eligibility: 'FISAT MCA Postgraduates (2026 Passout)',
            interviewDate: new Date('2026-08-20'),
            deadline: new Date('2026-08-10'),
            package: '₹9.50 LPA',
            location: 'Mysuru / Bengaluru',
            status: 'Registration Open',
            tags: ['Node.js', 'AngularJS', 'Docker', 'MCA Priority'],
            description: 'High-impact product development and distributed cloud architecture for MCA graduates.'
        },
        {
            id: 504,
            company: 'IBM India Systems Group',
            role: 'Software Systems Specialist',
            eligibility: 'FISAT MCA Batch 2026 (CGPA >= 7.00)',
            interviewDate: new Date('2026-08-25'),
            deadline: new Date('2026-08-15'),
            package: '₹11.00 LPA',
            location: 'Kochi / Bengaluru',
            status: 'Closing Soon',
            tags: ['C++', 'Linux', 'Microservices', 'MCA Stream'],
            description: 'Core backend development, Linux kernel programming, and web services.'
        }
    ];

    $scope.applyPlacementModal = function(placement) {
        $scope.selectedPlacement = placement;
        $scope.showPlacementModal = true;
    };

    $scope.submitPlacementApplication = function() {
        $scope.showNotification('Application submitted to FISAT MCA Placement Cell.', 'success');
        $scope.showPlacementModal = false;
    };

    $scope.selectedResourceCategory = '';
    
    $scope.resourceCategoriesOptions = [
        { label: 'All MCA Resource Categories', value: '' },
        { label: 'MCA Lecture Notes', value: 'Lecture Notes' },
        { label: 'KTU MCA Question Papers', value: 'Question Papers' },
        { label: 'MCA Laboratory Manuals', value: 'Lab Manuals' },
        { label: 'MCA Reference Materials', value: 'Study Materials' }
    ];

    $scope.resources = [
        {
            id: 601,
            code: '20MCA201',
            title: '20MCA201: Web Programming & AngularJS Handbook',
            subject: 'MCA Web Technologies',
            category: 'Lecture Notes',
            format: 'PDF Document',
            size: '4.2 MB',
            author: 'Prof. Shahid Khan (MCA Dept)',
            downloads: 480,
            dateAdded: new Date('2026-07-15')
        },
        {
            id: 602,
            code: '20MCA203',
            title: '20MCA203: Data Science & Machine Learning Lab Manual',
            subject: 'MCA Data Science',
            category: 'Lab Manuals',
            format: 'PDF Document',
            size: '3.8 MB',
            author: 'FISAT MCA Faculty',
            downloads: 512,
            dateAdded: new Date('2026-07-12')
        },
        {
            id: 603,
            code: '20MCA205',
            title: '20MCA205: Advanced Database Systems Question Bank (2020-2025)',
            subject: 'MCA Database Systems',
            category: 'Question Papers',
            format: 'ZIP Archive',
            size: '14.5 MB',
            author: 'MCA Exam Controller Cell',
            downloads: 640,
            dateAdded: new Date('2026-07-10')
        },
        {
            id: 604,
            code: '20MCA207',
            title: '20MCA207: Operating Systems & System Software Lecture Notes',
            subject: 'MCA Operating Systems',
            category: 'Study Materials',
            format: 'PDF Document',
            size: '8.2 MB',
            author: 'FISAT MCA Library Desk',
            downloads: 390,
            dateAdded: new Date('2026-07-05')
        }
    ];

    $scope.downloadResource = function(res) {
        res.downloads++;
        $scope.showNotification('Download started for MCA Course ' + res.code, 'info');
    };

    $scope.getNoticeCount = function() {
        return $scope.notices.length;
    };

    $scope.getUpcomingEventsCount = function() {
        return $scope.events.length;
    };

    $scope.getLostItemsCount = function() {
        return $scope.lostAndFound.filter(function(item) { return item.status === 'Lost'; }).length;
    };

    $scope.getPlacementCount = function() {
        return $scope.placements.filter(function(p) { return p.status === 'Registration Open'; }).length;
    };

    $scope.getSeatsPercentage = function(evt) {
        if (!evt || !evt.totalSeats) return 0;
        return Math.round((evt.bookedSeats / evt.totalSeats) * 100);
    };

    $scope.getSeatProgressStyle = function(evt) {
        var pct = $scope.getSeatsPercentage(evt);
        var color = '#09090b';
        if (pct > 75) color = '#52525b';
        if (pct >= 95) color = '#18181b';
        return {
            'width': pct + '%',
            'background-color': color
        };
    };
}]);
