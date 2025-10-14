import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({required this.onLoginSuccess, super.key});

  final VoidCallback onLoginSuccess;

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _loading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _loading = true);
    await Future<void>.delayed(const Duration(milliseconds: 600));
    if (mounted) {
      setState(() => _loading = false);
      widget.onLoginSuccess();
    }
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [colorScheme.primary.withOpacity(0.85), colorScheme.secondary.withOpacity(0.85)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'BIDI Medical Device Management',
                    textAlign: TextAlign.center,
                    style: Theme.of(context)
                        .textTheme
                        .headlineSmall
                        ?.copyWith(color: Colors.white, fontWeight: FontWeight.w700),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'เข้าสู่ระบบสำหรับเจ้าหน้าที่ เพื่อบริหารจัดการเครื่องมือแพทย์แบบเรียลไทม์',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.white70),
                  ),
                  const SizedBox(height: 32),
                  Card(
                    elevation: 14,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
                    child: Padding(
                      padding: const EdgeInsets.all(26),
                      child: Form(
                        key: _formKey,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                    color: colorScheme.primary.withOpacity(0.1),
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                                  child: Icon(Icons.shield_outlined, color: colorScheme.primary),
                                ),
                                const SizedBox(width: 12),
                                const Expanded(
                                  child: Text(
                                    'เข้าสู่ระบบ BIDI MDM',
                                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 24),
                            TextFormField(
                              controller: _emailController,
                              decoration: const InputDecoration(labelText: 'อีเมล BIDI'),
                              validator: (value) {
                                if (value == null || value.isEmpty) return 'กรุณากรอกอีเมล';
                                if (!value.contains('@')) return 'รูปแบบอีเมลไม่ถูกต้อง';
                                return null;
                              },
                            ),
                            const SizedBox(height: 16),
                            TextFormField(
                              controller: _passwordController,
                              obscureText: true,
                              decoration: const InputDecoration(labelText: 'รหัสผ่าน'),
                              validator: (value) {
                                if (value == null || value.isEmpty) return 'กรุณากรอกรหัสผ่าน';
                                if (value.length < 6) return 'รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร';
                                return null;
                              },
                            ),
                            const SizedBox(height: 26),
                            SizedBox(
                              width: double.infinity,
                              child: FilledButton.icon(
                                onPressed: _loading ? null : _submit,
                                icon: _loading
                                    ? const SizedBox(
                                        width: 18,
                                        height: 18,
                                        child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                                      )
                                    : const Icon(Icons.login_rounded),
                                label: const Text('เข้าสู่ระบบ'),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
