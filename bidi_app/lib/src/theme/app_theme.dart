import 'package:flutter/material.dart';

ThemeData buildBidiTheme() {
  const seedColor = Color(0xFF0D47A1);
  final colorScheme = ColorScheme.fromSeed(
    seedColor: seedColor,
    brightness: Brightness.light,
  );

  return ThemeData(
    colorScheme: colorScheme,
    useMaterial3: true,
    fontFamily: 'Prompt',
    scaffoldBackgroundColor: const Color(0xFFF4F7FB),
    appBarTheme: AppBarTheme(
      backgroundColor: colorScheme.surface,
      foregroundColor: colorScheme.onSurface,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: const TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
    ),
    navigationBarTheme: NavigationBarThemeData(
      surfaceTintColor: Colors.white,
      labelTextStyle: MaterialStateProperty.resolveWith(
        (states) => TextStyle(
          fontWeight: states.contains(MaterialState.selected) ? FontWeight.w600 : FontWeight.w500,
        ),
      ),
    ),
    cardTheme: CardTheme(
      elevation: 0,
      color: Colors.white,
      surfaceTintColor: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
    ),
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
    ),
    textTheme: const TextTheme(
      bodyMedium: TextStyle(fontSize: 15),
      labelLarge: TextStyle(fontWeight: FontWeight.w600),
    ),
  );
}
