
/* description: Parses and executes mathematical expressions. */
/* lexical grammar */
%lex
ID          [a-zA-Z]([a-zA-Z0-9])+
%%
[#][^\n]*\n   	                    {}
\s+                   /* skip whitespace */
\f+   					            {}
\n+   					            {}
\r+   					            {}
\v+   					            {}
(\"[^\"]*\")|(['][^']*['])                        {/* console.log('<STRING>'+yytext);  */   return 'TEXT'; }
"true"                              {return 'TRUE';}
"false"                             {return 'FALSE';}
[0-9]+("."[0-9]+)?\b                {return 'NUM';}
"@"{ID}                             {return 'NAMEV'}
"DECLARE"                           {return 'DECLARE'}
"AS"                                {return 'AS'}
"SET"                                {return 'SET'}
"AND"                                {return 'AND'}
"INPUT"                                {return 'INPUT'}
"PRINT"                                {return 'PRINT'}

/*ARITMETICAS*/
"INT"                                 {return 'INT';}
"STRING"                              {return 'STRING';}
"TEXT"                                {return 'TEX';}
"DECIMAL"                             {return 'DECIMAL';}
"BOOLEAN"                             {return 'BOOLEAN';}
/*ARITMETICAS*/
"*"                                 {return '*';}
"/"                                 {return '/';}
"-"                                 {return '-';}
"+"                                 {return '+';}
/*RELACIONAL*/
"!="                                 {return '!=';}
"=="                                 {return '==';}
"<"                                  {return '<';}
">"                                  {return '>';}
"<="                                 {return '<=';}
">="                                 {return '>=';}
"!"                                  {return '!';}
"||"                                 {return '||';}
"&&"                                 {return '&&';}
/*AGRUPACION*/
"("                                 {return '(';}
")"                                 {return ')';}
/*OTROS*/
";"                                 {return ';';}
","                                 {return ',';}
"="                                 {return '=';}
/*TOKEN COMPLEJOS*/
[a-zA-Z][a-zA-Z0-9]+([_]+[a-zA-Z0-9]+)+          {return 'PROPERTY_NAME'}
{ID}                                {return 'TABLE_NAME'}
<<EOF>>                             {return 'EOF';}
.                                   {console.log('<ERROR>'+yytext);return 'INVALID';}


/lex

/* operator associations and precedence */
%left UMINUS
%right '!'
%left '&&'
%left '||'
%left '==' '!=' '<' '<=' '>' '>='
%left '+' '-'
%left '*' '/'

%token INVALID

%start expressions

%% /* language grammar */
/*inicio de la gramatica */
expressions
    : acciones EOF
    | EOF
    ;
acciones 
    : acciones realizar
    |realizar
    ;
realizar 
/*asignar datos a la tabla*/
    : asignar_informacion_tabla ';' 
    /*asignar tabla*/  
    | tabla {return $$;}
    /*declarar variables*/
    | declarar
    | asignar_valor seguir
    |imprimir
    ;
imprimir : PRINT '(' ')' '' ;
dato_secuencia :dato_secuencia ',' dato | dato; 
/*ASIGNAR VALORES*/
seguir :';' | AND asignar ';';
asignar_valor 
    :
    asignar_valor  ',' asignar
    |SET asignar
    ;
asignar : asignar NAMEV '=' dato | NAMEV '=' dato;
/*declaracion de variables*/
declarar 
    : 
    DECLARE secuencia_nombres AS tipo_atributo 
    ;
secuencia_nombres 
    :secuencia_nombres ','  NAMEV
    |NAMEV
    ;
siguiente : |  ;
asignar 
    : '=' dato ';'
    | ';' 
    ;
asignar_informacion_tabla 
    :
    asignar_informacion_tabla ','  nombre_atributo '=' dato 
    |nombre_atributo '=' dato 
    ; 
finalizar_operacion : ';' | ERROR ; 
dato 
    :
    p
    |TEXT
    ;
/*estructura de la tabla*/
tabla 
    : 
    TABLE_NAME '(' atributo_tabla ')' ';'
    ;
atributo_tabla 
    : 
    atributo_tabla ','  nombre_atributo tipo_atributo 
    |nombre_atributo tipo_atributo
    ;
nombre_atributo : PROPERTY_NAME | TABLE_NAME;
tipo_atributo
    :
    INT
    |STRING
    |DECIMAL
    |BOOLEAN
    |TEX
    ;
/*CALCULADORA*/
e
    : e '+' e
        {$$ = $1 + $3;}
    | e '-' e
        {$$ = $1 - $3;}
    | e '*' e
        {$$ = $1 * $3;}
    | e '/' e
        {$$ = $1 / $3;}
    | e '!'
        {{
          $$ = (function fact(n) { 
	    return n == 0 ? 1 : fact(n - 1) * n; 
	  })($1);
        }}
    | '-' e                 %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUM
        {$$ = Number(yytext);}
    | INPUT '(' TEXT ')' 
    ;
/*union de calculadora con */
p 
    :
    '!' p
    |p '!=' p
    |p '==' p
    |p '<' p
    |p '>' p
    |p '<=' p
    |p '>=' p
    |p '||' p
    |p '&&' p
    |TRUE
    |FALSE
    |e
    |NAMEV
    ;