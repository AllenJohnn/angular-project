var app = angular.module('campusConnectApp', []);

app.controller('MainController', ['$scope', function($scope) {
    $scope.activeTab = 'home';
    $scope.isDarkTheme = false;
    $scope.notification = null;
    $scope.portalLoaded = false;

    $scope.initPortal = function() {
        $scope.portalLoaded = true;
    };

    $scope.portalInfo = {
        institutionName: 'Federal Institute of Science and Technology (FISAT)',
        systemTitle: 'FISAT | CampusConnect Smart Campus Portal',
        shortName: 'FISAT CampusConnect',
        location: 'Hormis Nagar, Mookkannoor, Angamaly, Kerala',
        academicYear: '2025–2026',
        currentTerm: 'Even Semester (Spring 2026)',
        teamName: 'Ultriod',
        teamLeader: 'Allen John Joy',
        studentProfile: {
            name: 'Allen John Joy',
            rollNumber: 'FIT24CS001',
            program: 'B.Tech / Post-Graduate',
            semester: 'Semester IV',
            cgpa: 8.85,
            attendance: '94.2%',
            email: 'allen.joy@fisat.ac.in'
        }
    };

    $scope.setActiveTab = function(tab) {
        $scope.activeTab = tab;
    };

    $scope.enterPortal = function() {
        $scope.activeTab = 'dashboard';
        $scope.showNotification('Welcome, ' + $scope.portalInfo.studentProfile.name + '! Connected to FISAT CampusConnect.', 'success');
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
        'Department of Computer Science & Engineering (CSE)',
        'Department of Electronics & Communication (ECE)',
        'Department of Mechanical Engineering (ME)',
        'Department of Electrical & Electronics (EEE)',
        'Department of Civil Engineering (CE)',
        'Department of Computer Applications (MCA)',
        'Department of Business Administration (MBA)',
        'FISAT Placement & Training Cell',
        'FISAT Central Academic Cell'
    ];

    $scope.notices = [
        {
            id: 101,
            circularNo: 'FISAT/GEN/2026/CIRC-084',
            title: 'Students are informed to collect the Admit card!',
            department: 'FISAT Central Academic Cell',
            date: new Date('2026-07-24'),
            priority: 'High',
            description: 'Pay the dues in all the laboratories and then you can collect the admit card for the sem exam from HOD of respective departments.'
        },
        {
            id: 102,
            circularNo: 'FISAT/GEN/2026/ACAD-042',
            title: 'KTU All-Department End-Semester Viva & Main Project Evaluation',
            department: 'FISAT Central Academic Cell',
            date: new Date('2026-07-22'),
            priority: 'Medium',
            description: 'All-department final semester main project viva examinations conducted across campus laboratories.'
        },
        {
            id: 103,
            circularNo: 'FISAT/GEN/2026/CIRC-012',
            title: 'VTU / KTU 1st sem exams from 27th has been postponed!',
            department: 'FISAT Central Academic Cell',
            date: new Date('2026-07-20'),
            priority: 'Low',
            description: 'Official university notification regarding updated examination timetable released by FISAT Academic Dean.'
        }
    ];

    $scope.newNotice = {
        title: '',
        circularNo: '',
        department: 'FISAT Central Academic Cell',
        priority: 'Medium',
        description: ''
    };

    $scope.addNotice = function() {
        if (!$scope.newNotice.title || !$scope.newNotice.description) return;
        var generatedRef = 'FISAT/GEN/' + new Date().getFullYear() + '/CIRC-' + Math.floor(100 + Math.random() * 900);
        $scope.notices.unshift({
            id: Date.now(),
            circularNo: $scope.newNotice.circularNo || generatedRef,
            title: $scope.newNotice.title,
            department: $scope.newNotice.department,
            date: new Date(),
            priority: $scope.newNotice.priority,
            description: $scope.newNotice.description
        });
        $scope.newNotice = { title: '', circularNo: '', department: 'FISAT Central Academic Cell', priority: 'Medium', description: '' };
        $scope.showNoticeModal = false;
        $scope.showNotification('Circular published successfully.', 'success');
    };

    $scope.eventCategoryFilter = 'All';
    $scope.selectedEvent = null;
    $scope.showEventModal = false;

    $scope.eventCategories = ['All', 'Technical', 'Workshops', 'Placement Drives', 'College Events'];

    $scope.events = [
        {
            id: 201,
            code: 'FISAT-EVT-01',
            name: 'Phase Shift 2026: FISAT National All-College Technical Symposium',
            date: new Date('2026-08-05'),
            venue: 'FISAT Main Auditorium & Seminar Halls',
            organizer: 'FISAT Student Council & Tech Association',
            totalSeats: 300,
            bookedSeats: 240,
            category: 'Technical',
            description: 'Flagship national technical fest featuring competitive coding, web architecture hackathons, robotic challenges, and paper presentations.'
        },
        {
            id: 202,
            code: 'FISAT-EVT-02',
            name: 'Hands-on Workshop: Web Systems & Software Architecture',
            date: new Date('2026-08-10'),
            venue: 'FISAT Central Computing Lab 3',
            organizer: 'FISAT Computing & Web Innovation Cell',
            totalSeats: 120,
            bookedSeats: 110,
            category: 'Workshops',
            description: 'Practical lab session covering modern web engineering, backend scripting, database drivers, and cloud architecture.'
        },
        {
            id: 203,
            code: 'FISAT-EVT-03',
            name: 'FISAT Campus Recruitment Summit & Tech Talk',
            date: new Date('2026-08-18'),
            venue: 'FISAT Conference Complex',
            organizer: 'FISAT Placement & Training Cell',
            totalSeats: 250,
            bookedSeats: 195,
            category: 'Placement Drives',
            description: 'Industry insights on distributed systems, DevOps pipelines, and career growth for engineering & computer application graduates.'
        }
    ];

    $scope.registeredStudents = [
        { eventCode: 'FISAT-EVT-01', eventName: 'Phase Shift National Tech Symposium', studentName: 'Allen John Joy', studentId: 'FIT24CS001', email: 'allen.joy@fisat.ac.in', phone: '9876543210', department: 'CSE', year: '2nd Year', regDate: new Date('2026-07-21') },
        { eventCode: 'FISAT-EVT-02', eventName: 'Web Systems Workshop', studentName: 'Neeha Nazer', studentId: 'FIT24CS015', email: 'neeha.nazer@fisat.ac.in', phone: '9876543215', department: 'CSE', year: '2nd Year', regDate: new Date('2026-07-22') }
    ];

    $scope.regForm = {
        eventId: null,
        studentName: '',
        studentId: '',
        email: '',
        phone: '',
        department: 'CSE',
        year: '2nd Year',
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
            $scope.regForm = { eventId: null, studentName: '', studentId: '', email: '', phone: '', department: 'CSE', year: '2nd Year', agreeTerms: false };
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
            title: 'Casio FX-991EX Scientific Calculator',
            category: 'Electronics',
            dateFound: new Date('2026-07-22'),
            location: 'FISAT Central Library (2nd Floor)',
            status: 'Found',
            contactPerson: 'Mr. Ramesh Kumar (Central Library Asst)',
            phone: '0484-2725272',
            description: 'Turned in to FISAT Central Library Helpdesk.'
        },
        {
            id: 302,
            itemRef: 'FISAT-LF-092',
            title: 'FISAT Student ID Lanyard & RFID Campus Access Card',
            category: 'Documents',
            dateFound: new Date('2026-07-23'),
            location: 'FISAT Canteen Courtyard',
            status: 'Lost',
            contactPerson: 'Neeha Nazer (FIT24CS015)',
            phone: '9876543215',
            description: 'Navy FISAT lanyard misplaced near main block auditorium.'
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
        $scope.newItem = { title: '', category: 'Electronics', dateFound: new Date(), location: '', status: 'Lost', contactPerson: '', phone: '', description: '' };
    };

    $scope.marketplaceCategoryFilter = 'All';
    $scope.marketplaceSearch = '';
    $scope.showMarketplaceModal = false;

    $scope.marketplaceCategories = ['All', 'Books', 'Electronics', 'Lab Equipment', 'Accessories'];

    $scope.marketplace = [
        {
            id: 401,
            title: 'KTU Engineering Data Structures & Software Engg Reference Bundle',
            category: 'Books',
            sellerName: 'Nikhil Eashy (FIT24CS018)',
            price: 550,
            condition: 'Good Condition',
            contact: 'nikhil.eashy@fisat.ac.in',
            datePosted: new Date('2026-07-18'),
            description: 'Recommended textbook set for KTU engineering semesters.'
        },
        {
            id: 402,
            title: 'Logitech Wireless Keyboard & Laser Mouse',
            category: 'Electronics',
            sellerName: 'P. U. Athul Krishna (FIT24CS022)',
            price: 850,
            condition: 'Like New',
            contact: 'athul.krishna@fisat.ac.in',
            datePosted: new Date('2026-07-21'),
            description: 'Dual Bluetooth & USB receiver. Ideal for engineering lab workstations.'
        }
    ];

    $scope.newProduct = {
        title: '',
        category: 'Books',
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
            description: $scope.newProduct.description
        });
        $scope.showNotification('Product listed successfully.', 'success');
        $scope.showMarketplaceModal = false;
        $scope.newProduct = { title: '', category: 'Books', sellerName: '', price: '', condition: 'Good Condition', contact: '', description: '' };
    };

    $scope.placementSearch = '';
    $scope.selectedPlacement = null;
    $scope.showPlacementModal = false;

    $scope.placements = [
        {
            id: 501,
            company: 'TCS Digital / Ninja',
            role: 'Specialist Software Engineer',
            eligibility: 'FISAT Batch 2026 (All Streams)',
            interviewDate: new Date('2026-08-08'),
            deadline: new Date('2026-08-02'),
            package: '₹7.50 LPA',
            location: 'Kochi / Bengaluru',
            status: 'Registration Open',
            tags: ['Java', 'Algorithms', 'SQL', 'All Streams'],
            description: 'Software engineering & data structure problem solving.'
        },
        {
            id: 502,
            company: 'Cognizant (CTS)',
            role: 'Programmer Analyst Trainee',
            eligibility: 'FISAT Final Year Students',
            interviewDate: new Date('2026-08-14'),
            deadline: new Date('2026-08-04'),
            package: '₹6.75 LPA',
            location: 'Kochi / Chennai',
            status: 'Registration Open',
            tags: ['PHP', 'Web Systems', 'Cloud', 'Campus Drive'],
            description: 'Web development, PHP scripting, and software architecture.'
        },
        {
            id: 503,
            company: 'Infosys Specialist Unit',
            role: 'Power Programmer',
            eligibility: 'FISAT Graduates & Postgraduates (2026 Passout)',
            interviewDate: new Date('2026-08-20'),
            deadline: new Date('2026-08-10'),
            package: '₹9.50 LPA',
            location: 'Mysuru / Bengaluru',
            status: 'Registration Open',
            tags: ['Software Engg', 'Computer Architecture', 'Docker'],
            description: 'Product development and low-level system design across departments.'
        }
    ];

    $scope.applyPlacementModal = function(placement) {
        $scope.selectedPlacement = placement;
        $scope.showPlacementModal = true;
    };

    $scope.submitPlacementApplication = function() {
        $scope.showNotification('Application submitted to FISAT Central Placement Cell.', 'success');
        $scope.showPlacementModal = false;
    };

    $scope.selectedResourceCategory = '';
    
    $scope.resourceCategoriesOptions = [
        { label: 'All Resource Categories', value: '' },
        { label: 'Subject Notes', value: 'Subject Notes' },
        { label: 'Previous Year Question Papers', value: 'Previous Year Question Papers' },
        { label: 'Lab Manuals', value: 'Lab Manuals' },
        { label: 'Study Materials', value: 'Study Materials' }
    ];

    $scope.resources = [
        {
            id: 601,
            code: '20CS201',
            title: '20CS201: Data Structures and Algorithms Handbook',
            subject: 'Data Structures & Algorithms',
            category: 'Subject Notes',
            format: 'PDF Document',
            size: '4.2 MB',
            author: 'Prof. Sona Mary Louis (Academic Dean)',
            downloads: 820
        },
        {
            id: 602,
            code: '20CS203',
            title: '20CS203: Digital Fundamentals and Computer Architecture Notes',
            subject: 'Computer Architecture',
            category: 'Subject Notes',
            format: 'PDF Document',
            size: '5.1 MB',
            author: 'Prof. Rakhi Venugopal (FISAT Faculty)',
            downloads: 740
        },
        {
            id: 603,
            code: '20CS205',
            title: '20CS205: Advanced Software Engineering Question Papers (2020-2025)',
            subject: 'Software Engineering',
            category: 'Previous Year Question Papers',
            format: 'ZIP Archive',
            size: '14.5 MB',
            author: 'Prof. Sujesh P Lal (FISAT Faculty)',
            downloads: 910
        },
        {
            id: 604,
            code: '20CS207',
            title: '20CS207: Web and PHP Lab Workbook & Practical Solutions',
            subject: 'Web & PHP Lab',
            category: 'Lab Manuals',
            format: 'PDF Document',
            size: '12.8 MB',
            author: 'Prof. Rosemary (FISAT Faculty)',
            downloads: 980
        }
    ];

    $scope.downloadResource = function(res) {
        res.downloads++;
        $scope.showNotification('Download started for ' + res.code, 'info');
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
        return $scope.placements.filter(function(p) { return p.status === 'Registration Open' || p.status === 'Open'; }).length;
    };

    $scope.getSeatsPercentage = function(evt) {
        if (!evt || !evt.totalSeats) return 0;
        return Math.round((evt.bookedSeats / evt.totalSeats) * 100);
    };

    $scope.refreshNotices = function() {
        $scope.showNotification('Notice board refreshed.', 'info');
    };
}]);
