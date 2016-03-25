//"out" varyings to our fragment shader
varying vec4 vColor;
varying vec2 vTexCoord;

void main() 
{
    	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
    
	gl_TexCoord[0] = gl_TextureMatrix[0] * gl_MultiTexCoord0;
	
	vTexCoord = gl_TexCoord[0].xy;
	vColor = gl_Color;
}