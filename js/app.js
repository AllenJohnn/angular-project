/**
 * CampusConnect - Smart Campus Portal
 * AngularJS Main Application Module & Controller
 * Team: Ultriod (Leader: Allen John Joy | Members: Neeha Nazer, Nikhil Eashy, P. U. Athul Krishna)
 * Guide: Shahid Khan
 */

var app = angular.module('campusConnectApp', []);

app.controller('MainController', ['$scope', function($scope) {
    // --- Application State ---
    $scope.activeTab = 'dashboard';
    $scope.isDarkTheme = false;
    $scope.searchQuery = '';
    $scope.notification = null;

    // College & Team Metadata
    $scope.portalInfo = {
        title: 'CampusConnect',
        subtitle: 'Smart Campus Portal',
        teamName: 'Ultriod',
        teamLeader: 'Allen John Joy',
        guide: 'Shahid Khan',
        department: 'Master of Computer Applications (MCA)',
        academicYear: '2025 - 2026',
        teamMembers: [
            { name: 'Allen John Joy', role: 'Team Leader', id: '24MCA001' },
            { name: 'Neeha Nazer', role: 'UI/UX Developer', id: '24MCA015' },
            { name: 'Nikhil Eashy', role: 'Frontend Architect', id: '24MCA018' },
            { name: 'P. U. Athul Krishna', role: 'Data Specialist', id: '24MCA022' }
        ]
    };

    // UI Helpers
    $scope.setActiveTab = function(tab) {
        $scope.activeTab = tab;
    };

    $scope.toggleTheme = function() {
        $scope.isDarkTheme = !$scope.isDarkTheme;
        $scope.showNotification($scope.isDarkTheme ? 'Dark Mode Activated' : 'Light Mode Activated', 'info');
    };

    $scope.showNotification = function(msg, type) {
        $scope.notification = { message: msg, type: type || 'success' };
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.notification = null;
            });
        }, 4000);
    };

    // ==========================================
    // 1. CAMPUS NOTICES DATA & METHODS
    // ==========================================
    $scope.noticeFilterPriority = '';
    $scope.noticeFilterDept = '';
    $scope.noticeSearchText = '';
    $scope.showNoticeModal = false;

    $scope.departmentsList = [
        'All Departments',
        'Computer Science',
        'Examination Cell',
        'Placement Cell',
        'Central Library',
        'Sports Committee',
        'Administration'
    ];

    $scope.notices = [
        {
            id: 1,
            title: 'End Semester Examination Schedule Released',
            department: 'Examination Cell',
            date: new Date('2026-08-01'),
            priority: 'High',
            description: 'The tentative timetable for the MCA & B.Tech upcoming end-semester examinations has been published on the official notice board. Hall tickets will be issued starting July 28.',
            pinned: true
        },
        {
            id: 2,
            title: 'Annual Tech Fest "TechStorm 2026" Registrations Open',
            department: 'Computer Science',
            date: new Date('2026-07-28'),
            priority: 'Medium',
            description: 'Hackathons, gaming events, paper presentations, and web design challenges await! Cash prizes worth ₹1,50,000 up for grabs.',
            pinned: true
        },
        {
            id: 3,
            title: 'Campus Recruitment Drive: TechCorp Systems',
            department: 'Placement Cell',
            date: new Date('2026-07-30'),
            priority: 'High',
            description: 'TechCorp Systems is conducting campus placement for MCA & B.Tech 2026 passing out batch. Registered candidates report to Main Seminar Hall at 9:00 AM.',
            pinned: false
        },
        {
            id: 4,
            title: 'Central Library Extended Hours for Exam Prep',
            department: 'Central Library',
            date: new Date('2026-07-25'),
            priority: 'Low',
            description: 'To facilitate exam preparation, the Central Library will remain open until 11:00 PM every weekday starting July 26th.',
            pinned: false
        },
        {
            id: 5,
            title: 'Inter-Departmental Football Tournament',
            department: 'Sports Committee',
            date: new Date('2026-08-05'),
            priority: 'Medium',
            description: 'Department captains are requested to submit team rosters by August 2nd. Fixtures will be announced on August 3rd.',
            pinned: false
        }
    ];

    $scope.newNotice = {
        title: '',
        department: 'Computer Science',
        priority: 'Medium',
        description: '',
        pinned: false
    };

    $scope.addNotice = function() {
        if (!$scope.newNotice.title || !$scope.newNotice.description) return;
        
        $scope.notices.unshift({
            id: Date.now(),
            title: $scope.newNotice.title,
            department: $scope.newNotice.department,
            date: new Date(),
            priority: $scope.newNotice.priority,
            description: $scope.newNotice.description,
            pinned: $scope.newNotice.pinned
        });

        $scope.newNotice = { title: '', department: 'Computer Science', priority: 'Medium', description: '', pinned: false };
        $scope.showNoticeModal = false;
        $scope.showNotification('New campus notice posted successfully!', 'success');
    };

    // ==========================================
    // 2. EVENT REGISTRATION DATA & METHODS
    // ==========================================
    $scope.eventCategoryFilter = 'All';
    $scope.selectedEvent = null;
    $scope.showEventModal = false;

    $scope.eventCategories = ['All', 'Technical', 'Sports', 'Cultural', 'Career'];

    $scope.events = [
        {
            id: 101,
            name: 'AI & Machine Learning Hands-on Workshop',
            date: new Date('2026-08-05'),
            venue: 'Auditorium Hall A',
            organizer: 'MCA Dept & AI Society',
            totalSeats: 100,
            bookedSeats: 68,
            category: 'Technical',
            description: 'Interactive workshop covering Deep Neural Networks, TensorFlow, and Generative AI applications with real-world datasets.'
        },
        {
            id: 102,
            name: 'Annual Inter-College Sports Championship',
            date: new Date('2026-08-12'),
            venue: 'Campus Sports Complex',
            organizer: 'Sports Council',
            totalSeats: 250,
            bookedSeats: 180,
            category: 'Sports',
            description: 'Compete in athletics, basketball, football, volleyball, and table tennis championships.'
        },
        {
            id: 103,
            name: 'Cybersecurity & Ethical Hacking Symposium',
            date: new Date('2026-08-18'),
            venue: 'Seminar Hall 3',
            organizer: 'CyberSec Research Lab',
            totalSeats: 80,
            bookedSeats: 78,
            category: 'Technical',
            description: 'Live penetration testing demonstration, web application security auditing, and career guidance in cybersecurity.'
        },
        {
            id: 104,
            name: 'Grand Cultural Night & Music Concert',
            date: new Date('2026-08-25'),
            venue: 'Open Air Amphitheatre',
            organizer: 'Cultural Arts Society',
            totalSeats: 400,
            bookedSeats: 320,
            category: 'Cultural',
            description: 'Live musical band, choreography competitions, fashion show, and celebrity guest appearance.'
        }
    ];

    // Registration Form & Registered Attendees array
    $scope.registeredStudents = [
        { eventName: 'AI & Machine Learning Hands-on Workshop', studentName: 'Allen John Joy', studentId: '24MCA001', email: 'allen.joy@campus.edu', phone: '9876543210', department: 'MCA', year: '2nd Year', regDate: new Date('2026-07-20') },
        { eventName: 'Annual Inter-College Sports Championship', studentName: 'Nikhil Eashy', studentId: '24MCA018', email: 'nikhil.eashy@campus.edu', phone: '9876543211', department: 'MCA', year: '2nd Year', regDate: new Date('2026-07-21') }
    ];

    $scope.regForm = {
        eventId: null,
        studentName: '',
        studentId: '',
        email: '',
        phone: '',
        department: 'MCA',
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
                eventName: evt.name,
                studentName: $scope.regForm.studentName,
                studentId: $scope.regForm.studentId,
                email: $scope.regForm.email,
                phone: $scope.regForm.phone,
                department: $scope.regForm.department,
                year: $scope.regForm.year,
                regDate: new Date()
            });

            $scope.showNotification('Registration successful for ' + evt.name + '!', 'success');
            $scope.showEventModal = false;
            
            // Reset form
            $scope.regForm = {
                eventId: null,
                studentName: '',
                studentId: '',
                email: '',
                phone: '',
                department: 'MCA',
                year: '2nd Year',
                comments: '',
                agreeTerms: false
            };
            form.$setPristine();
            form.$setUntouched();
        } else {
            $scope.showNotification('Sorry, this event is already fully booked!', 'warning');
        }
    };

    // ==========================================
    // 3. LOST & FOUND PORTAL DATA & METHODS
    // ==========================================
    $scope.lostFoundStatusFilter = 'All';
    $scope.showLostFoundModal = false;

    $scope.lostAndFound = [
        {
            id: 201,
            title: 'Black HP Laptop Power Adapter (65W)',
            category: 'Electronics',
            dateFound: new Date('2026-07-22'),
            location: 'Lab 4 (Computer Center)',
            status: 'Found',
            contactPerson: 'Ramesh Kumar (Lab Asst)',
            phone: '9876501122',
            description: 'Original HP smart AC adapter left plugged in desk #14.'
        },
        {
            id: 202,
            title: 'Blue Analog Wrist Watch (Sonata)',
            category: 'Accessories',
            dateFound: new Date('2026-07-23'),
            location: 'Main Campus Canteen',
            status: 'Lost',
            contactPerson: 'Allen John Joy',
            phone: '9876543210',
            description: 'Leather strap watch misplaced near counter 2 around lunch hour.'
        },
        {
            id: 203,
            title: 'Data Structures Textbook by Lipschutz',
            category: 'Books',
            dateFound: new Date('2026-07-20'),
            location: 'Central Library 2nd Floor',
            status: 'Found',
            contactPerson: 'Library Desk',
            phone: '9876599887',
            description: 'Hardcover Schaum Outline series book with sticky bookmarks.'
        },
        {
            id: 204,
            title: 'Red Stainless Steel Water Bottle',
            category: 'Accessories',
            dateFound: new Date('2026-07-21'),
            location: 'Basketball Court',
            status: 'Lost',
            contactPerson: 'Neeha Nazer',
            phone: '9876543215',
            description: '750ml insulated flask with college crest sticker.'
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

        $scope.lostAndFound.unshift({
            id: Date.now(),
            title: $scope.newItem.title,
            category: $scope.newItem.category,
            dateFound: new Date($scope.newItem.dateFound),
            location: $scope.newItem.location,
            status: $scope.newItem.status,
            contactPerson: $scope.newItem.contactPerson,
            phone: $scope.newItem.phone,
            description: $scope.newItem.description
        });

        $scope.showNotification('Lost & Found item reported successfully!', 'success');
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

    // ==========================================
    // 4. STUDENT MARKETPLACE DATA & METHODS
    // ==========================================
    $scope.marketplaceCategoryFilter = 'All';
    $scope.marketplaceSearch = '';
    $scope.showMarketplaceModal = false;

    $scope.marketplaceCategories = ['All', 'Books', 'Electronics', 'Lab Equipment', 'Accessories', 'Furniture'];

    $scope.marketplace = [
        {
            id: 301,
            title: 'Engineering Physics & Higher Math Textbooks',
            category: 'Books',
            sellerName: 'Nikhil Eashy',
            price: 450,
            condition: 'Like New',
            contact: 'nikhil.eashy@campus.edu | 9876541100',
            datePosted: new Date('2026-07-20'),
            badgeClass: 'badge-info',
            description: 'Complete set of 1st year reference books with highlighting and detailed solved notes.'
        },
        {
            id: 302,
            title: 'Logitech Wireless Ergonomic Mouse MX Anywhere',
            category: 'Electronics',
            sellerName: 'P. U. Athul Krishna',
            price: 750,
            condition: 'Good',
            contact: 'athul.krishna@campus.edu | 9876542200',
            datePosted: new Date('2026-07-21'),
            badgeClass: 'badge-primary',
            description: 'Works seamlessly on glass surfaces. Battery backup up to 40 days.'
        },
        {
            id: 303,
            title: 'Digital Multimeter & Microcontroller Breadboard Kit',
            category: 'Lab Equipment',
            sellerName: 'Neeha Nazer',
            price: 1100,
            condition: 'Excellent',
            contact: 'neeha.nazer@campus.edu | 9876543300',
            datePosted: new Date('2026-07-22'),
            badgeClass: 'badge-warning',
            description: 'Ideal for IoT and embedded systems lab projects. Includes jumper wires, sensors, and LEDs.'
        },
        {
            id: 304,
            title: 'Casio FX-991EX Non-Programmable Scientific Calculator',
            category: 'Accessories',
            sellerName: 'Allen John Joy',
            price: 850,
            condition: 'Brand New',
            contact: 'allen.joy@campus.edu | 9876544400',
            datePosted: new Date('2026-07-23'),
            badgeClass: 'badge-success',
            description: 'High-resolution matrix display, solar powered, permitted for university examinations.'
        }
    ];

    $scope.newProduct = {
        title: '',
        category: 'Books',
        sellerName: '',
        price: '',
        condition: 'Good',
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
            badgeClass: 'badge-success',
            description: $scope.newProduct.description
        });

        $scope.showNotification('Product listed on marketplace successfully!', 'success');
        $scope.showMarketplaceModal = false;

        $scope.newProduct = {
            title: '',
            category: 'Books',
            sellerName: '',
            price: '',
            condition: 'Good',
            contact: '',
            description: ''
        };
    };

    // ==========================================
    // 5. PLACEMENT CORNER DATA & METHODS
    // ==========================================
    $scope.placementSearch = '';
    $scope.selectedPlacement = null;
    $scope.showPlacementModal = false;

    $scope.placements = [
        {
            id: 401,
            company: 'Google Cloud Innovations',
            role: 'Associate Cloud Software Engineer',
            eligibility: 'MCA / B.Tech CSE (CGPA >= 7.5)',
            interviewDate: new Date('2026-08-15'),
            deadline: new Date('2026-08-05'),
            package: '₹14.5 LPA',
            location: 'Bengaluru / Hybrid',
            status: 'Open',
            tags: ['Python', 'AngularJS', 'GCP', 'Kubernetes'],
            description: 'Building next-generation distributed enterprise applications on Google Cloud Infrastructure.'
        },
        {
            id: 402,
            company: 'Microsoft India',
            role: 'Software Development Engineer (SDE-I)',
            eligibility: 'MCA / B.Tech (No active backlogs)',
            interviewDate: new Date('2026-08-20'),
            deadline: new Date('2026-08-10'),
            package: '₹18.0 LPA',
            location: 'Hyderabad',
            status: 'Open',
            tags: ['C#', '.NET Core', 'Azure', 'Algorithms'],
            description: 'Core product development team working on Azure DevOps & Office 365 services.'
        },
        {
            id: 403,
            company: 'TCS Digital',
            role: 'System Engineer - Full Stack',
            eligibility: 'MCA / M.Tech / B.Tech (CGPA >= 6.5)',
            interviewDate: new Date('2026-08-08'),
            deadline: new Date('2026-08-02'),
            package: '₹7.5 LPA',
            location: 'Kochi / Remote',
            status: 'Closing Soon',
            tags: ['Java', 'Spring Boot', 'JavaScript', 'SQL'],
            description: 'Developing resilient microservices and frontend portals for banking & healthcare sector.'
        },
        {
            id: 404,
            company: 'Infosys Specialist Programmer',
            role: 'Power Programmer / Tech Analyst',
            eligibility: 'All MCA & CS Undergraduates',
            interviewDate: new Date('2026-08-28'),
            deadline: new Date('2026-08-18'),
            package: '₹9.5 LPA',
            location: 'Pune / Mysuru',
            status: 'Open',
            tags: ['Node.js', 'React/Angular', 'PostgreSQL', 'Docker'],
            description: 'High-impact engineering role working directly with Fortune 500 client digital transformations.'
        }
    ];

    $scope.applyPlacementModal = function(placement) {
        $scope.selectedPlacement = placement;
        $scope.showPlacementModal = true;
    };

    $scope.submitPlacementApplication = function(studentId, resumeUrl) {
        $scope.showNotification('Application submitted to ' + $scope.selectedPlacement.company + '!', 'success');
        $scope.showPlacementModal = false;
    };

    // ==========================================
    // 6. ACADEMIC RESOURCES DATA & METHODS
    // ==========================================
    $scope.selectedResourceCategory = '';
    
    // Resource Categories for ng-options demo
    $scope.resourceCategoriesOptions = [
        { label: 'All Resource Types', value: '' },
        { label: 'Subject Notes', value: 'Subject Notes' },
        { label: 'Previous Year Question Papers', value: 'Previous Year Question Papers' },
        { label: 'Lab Manuals', value: 'Lab Manuals' },
        { label: 'Study Materials & E-Books', value: 'Study Materials' }
    ];

    $scope.resources = [
        {
            id: 501,
            title: 'Advanced AngularJS Architecture & Directives',
            subject: 'Web Technologies',
            category: 'Subject Notes',
            format: 'PDF Document',
            size: '4.2 MB',
            author: 'Prof. Shahid Khan',
            downloads: 245,
            dateAdded: new Date('2026-07-15')
        },
        {
            id: 502,
            title: 'Database Management Systems 5-Year Question Bank',
            subject: 'DBMS & SQL',
            category: 'Previous Year Question Papers',
            format: 'ZIP Archive',
            size: '14.8 MB',
            author: 'Examination Controller',
            downloads: 512,
            dateAdded: new Date('2026-07-10')
        },
        {
            id: 503,
            title: 'Data Structures & Algorithms C++ Lab Manual',
            subject: 'Data Structures',
            category: 'Lab Manuals',
            format: 'PDF Document',
            size: '3.5 MB',
            author: 'MCA Faculty',
            downloads: 389,
            dateAdded: new Date('2026-07-08')
        },
        {
            id: 504,
            title: 'Operating Systems - Silberschatz Reference Companion',
            subject: 'Operating Systems',
            category: 'Study Materials',
            format: 'PDF Document',
            size: '8.9 MB',
            author: 'Central Dept Library',
            downloads: 198,
            dateAdded: new Date('2026-07-01')
        },
        {
            id: 505,
            title: 'Software Engineering Agile Methodology Slides',
            subject: 'Software Engineering',
            category: 'Subject Notes',
            format: 'PPTX Presentation',
            size: '6.1 MB',
            author: 'Dr. V. Sharma',
            downloads: 167,
            dateAdded: new Date('2026-07-18')
        }
    ];

    $scope.downloadResource = function(res) {
        res.downloads++;
        $scope.showNotification('Downloading "' + res.title + '" (' + res.size + ')', 'info');
    };

    // ==========================================
    // 7. COMPUTED DASHBOARD METRICS & HELPERS
    // ==========================================
    $scope.getNoticeCount = function() {
        return $scope.notices.length;
    };

    $scope.getUpcomingEventsCount = function() {
        return $scope.events.length;
    };

    $scope.getLostItemsCount = function() {
        return $scope.lostAndFound.filter(function(item) { return item.status === 'Lost'; }).length;
    };

    $scope.getFoundItemsCount = function() {
        return $scope.lostAndFound.filter(function(item) { return item.status === 'Found'; }).length;
    };

    $scope.getPlacementCount = function() {
        return $scope.placements.filter(function(p) { return p.status === 'Open'; }).length;
    };

    $scope.getMarketplaceCount = function() {
        return $scope.marketplace.length;
    };

    $scope.getTotalRegistrationsCount = function() {
        return $scope.registeredStudents.length;
    };

    $scope.getSeatsPercentage = function(evt) {
        if (!evt || !evt.totalSeats) return 0;
        return Math.round((evt.bookedSeats / evt.totalSeats) * 100);
    };

    // Dynamic style helper for seat progress bars
    $scope.getSeatProgressStyle = function(evt) {
        var pct = $scope.getSeatsPercentage(evt);
        var color = '#10b981'; // green
        if (pct > 75) color = '#f59e0b'; // orange
        if (pct >= 95) color = '#ef4444'; // red
        return {
            'width': pct + '%',
            'background-color': color
        };
    };
}]);
