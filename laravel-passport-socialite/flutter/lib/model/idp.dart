class Idp {
  final String organizationName;
  final String issuer;

  const Idp({required this.organizationName, required this.issuer});

  factory Idp.fromJson(Map<String, dynamic> json) {
    return switch (json) {
      {
        'organizationName': String organizationName,
        'issuer': String issuer,
      } =>
        Idp(
          organizationName: organizationName,
          issuer: issuer,
        ),
      _ => throw const FormatException('Failed to load issuer.'),
    };
  }
}
