local claims = {
 email_verified: true
} + std.extVar('claims');

{
  identity: {
    traits: {
      [if 'urn:telematik:claims:email' in claims.raw_claims then 'email' else null]: claims.raw_claims['urn:telematik:claims:email'],
      [if 'urn:telematik:claims:id' in claims.raw_claims then 'health_id_kvnr' else null]: claims.raw_claims['urn:telematik:claims:id'],
      [if 'urn:telematik:claims:sub' in claims.raw_claims then 'health_id_sub' else null]: claims.raw_claims['urn:telematik:claims:sub'],
      [if 'ext-mimoto-original-iss' in claims.raw_claims then 'health_id_provider' else null]: claims.raw_claims['ext-mimoto-original-iss']
    },
    verified_addresses: std.prune([
      if 'email' in claims && claims.email_verified then { via: 'email', value: claims.email },
    ]),
  },
}