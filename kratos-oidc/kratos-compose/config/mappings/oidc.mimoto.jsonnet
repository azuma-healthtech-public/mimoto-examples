local claims = {
} + std.extVar('claims');

{
  identity: {
    traits: {
      [if 'urn:telematik:claims:email' in claims.raw_claims then 'email' else null]: claims.raw_claims['urn:telematik:claims:email'],
      [if 'urn:telematik:claims:id' in claims.raw_claims then 'health_id_kvnr' else null]: claims.raw_claims['urn:telematik:claims:id'],
      [if 'sub' in claims.raw_claims then 'health_id_sub' else null]: claims.raw_claims['sub'],
      [if 'ext-mimoto-original-iss' in claims.raw_claims then 'health_id_provider' else null]: claims.raw_claims['ext-mimoto-original-iss']
    }
  },
}