import 'package:flutter/material.dart';

import 'theme/app_theme.dart';
import 'features/auth/login_page.dart';
import 'features/devices/devices_page.dart';
import 'features/documents/documents_page.dart';
import 'features/history/history_page.dart';
import 'features/profile/profile_page.dart';
import 'features/scan/scan_page.dart';

class BidiApp extends StatefulWidget {
  const BidiApp({super.key});

  @override
  State<BidiApp> createState() => _BidiAppState();
}

class _BidiAppState extends State<BidiApp> {
  final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>();
  final ValueNotifier<bool> _isAuthenticated = ValueNotifier<bool>(false);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BIDI Medical Device Viewer',
      debugShowCheckedModeBanner: false,
      theme: buildBidiTheme(),
      navigatorKey: _rootNavigatorKey,
      home: ValueListenableBuilder<bool>(
        valueListenable: _isAuthenticated,
        builder: (context, signedIn, _) {
          if (!signedIn) {
            return LoginPage(onLoginSuccess: () => _isAuthenticated.value = true);
          }
          return _MainShell(onLoggedOut: () => _isAuthenticated.value = false);
        },
      ),
    );
  }
}

class _MainShell extends StatefulWidget {
  const _MainShell({required this.onLoggedOut});

  final VoidCallback onLoggedOut;

  @override
  State<_MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<_MainShell> {
  int _currentIndex = 0;

  final List<_NavDestination> _destinations = const [
    _NavDestination('เครื่องมือ', Icons.medical_services_outlined, DevicesPage()),
    _NavDestination('สแกน', Icons.qr_code_scanner, ScanPage()),
    _NavDestination('เอกสาร', Icons.description_outlined, DocumentsPage()),
    _NavDestination('ประวัติ', Icons.history_toggle_off, HistoryPage()),
    _NavDestination('โปรไฟล์', Icons.person_outline, ProfilePage()),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _destinations[_currentIndex].page,
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) => setState(() => _currentIndex = index),
        destinations: _destinations
            .map((destination) => NavigationDestination(
                  icon: Icon(destination.icon),
                  label: destination.label,
                ))
            .toList(),
      ),
      appBar: AppBar(
        title: Text(_destinations[_currentIndex].label),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'ออกจากระบบ',
            onPressed: widget.onLoggedOut,
          ),
        ],
      ),
    );
  }
}

class _NavDestination {
  const _NavDestination(this.label, this.icon, this.page);

  final String label;
  final IconData icon;
  final Widget page;
}
