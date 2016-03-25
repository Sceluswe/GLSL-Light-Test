// "in" from vertex shader.
varying vec2 vTexCoord;
varying vec4 vColor;

// Texture samples
uniform sampler2D u_texture;
uniform sampler2D u_normal;

// Values for the algorithm
uniform vec2 Resolution;
uniform vec3 LightPos;
uniform vec4 LightColor;
uniform vec4 AmbientColor;
uniform vec3 Falloff;

void main() // vec4(0.3,0.3,0.7,1)
{	
	vec3 Light = LightPos;
	Light.y = 1.0 - Light.y;

	vec4 DiffuseColor = texture2D(u_texture, vTexCoord);
	vec3 NormalMap = texture2D(u_normal, vTexCoord).rgb;
	NormalMap.g = 1.0 - NormalMap.g;

	vec3 LightDir = vec3(Light.xy - (gl_FragCoord.xy / Resolution.xy), Light.z);
	LightDir.x *= Resolution.x / Resolution.y;

	float D = length(LightDir);

	vec3 N = normalize(NormalMap * 2.0 - 1.0);
	vec3 L = normalize(LightDir);

	vec3 Diffuse = (LightColor.rgb * LightColor.a) * max(dot(N,L),0);

	vec3 Ambient = AmbientColor.rgb * AmbientColor.a;

	float Attenuation = 1.0 / (Falloff.x + (Falloff.y*D) + (Falloff.z*D*D));	
	

	vec3 Intensity = Ambient + Diffuse * Attenuation;
	vec3 FinalColor = DiffuseColor.rgb * Intensity;
	gl_FragColor = vColor * vec4(FinalColor, DiffuseColor.a);
}