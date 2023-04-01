
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
(\"[^\"]*\"|['][^']*['])                        {/* console.log('<STRING>'+yytext);  */   return 'TEXT'; }
"true"                              {return 'TRUE';}
"false"                             {return 'FALSE';}
[0-9]+("."[0-9]+)?\b                {return 'NUM';}
"@"{ID}                             {return 'NAMEV'}
"DECLARE"                           {return 'DECLARE'}
"AS"                                {return 'AS'}
"SET"                                {return 'SET'}
"AND"                                {return 'AND'}
"OR"                                {return 'OR'}
"INPUT"                                {return 'INPUT'}
"PRINT"                                {return 'PRINT'}
"IF"                                {return 'IF'}
"THEN"                                {return 'THEN'}
"END"                                {return 'END'}
"ELSEIF"                                {return 'ELSEIF'}
"SELECT"                                {return 'SELECT'}
"FROM"                                {return 'FROM'}
"WHERE"                                {return 'WHERE'}
"LIMIT"                                {return 'LIMIT'}
"OFFSET"                                {return 'OFFSET'}
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
"<="                                 {return '<=';}
">="                                 {return '>=';}
"<>"                                 {return '<>';}
"<"                                  {return '<';}
">"                                  {return '>';}
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
%left UMINU
%left '!'
%left '&&'
%left '||' 
%left OR AND
%left '==' '!=' '<' '<=' '>' '>=' '<>'
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
 /*asignar tabla*/
    :tabla ';' {return $$;} 
     /*asignar datos a la tabla*/
    | asignar_informacion_tabla ';'
    /*declarar variables*/
    | declarar asignar 
    /*asignar valor*/
    | asignar_valor seguir 
    /*imprimir*/
    | imprimir ';'
    /*if*/
    | if END IF ';' 
     /*select*/
    | select 
    ;
select
    :
    SELECT col_todo FROM nombre_atributo tipjo_filtro 
    ;
tipjo_filtro
    : WHERE  o_p ';'
    | LIMIT dato ';'
    | OFFSET dato ';'
    ;
col_todo
    :
    '*'
    |  bucle_serie
    ;
bucle_serie
    : bucle_serie ',' serie
    |serie
    ;
serie
    :PROPERTY_NAME
    | TABLE_NAME
    | NAMEV
    ;
nombre_serie 
    :nombre_serie ',' nombre_atributo
    |nombre_atributo
    ;
/*if*/
if 
    :
      IF o_p THEN acciones final_if 
    ;
final_if 
    :
    ELSE acciones 
    | ELSEIF o_p THEN acciones final_if
    | 
    ;
/*imprimir*/
imprimir : PRINT '(' dato_secuencia ')'  ;
dato_secuencia 
    :dato_secuencia ',' dato 
    | dato
    ; 
/*ASIGNAR VALORES*/
seguir :  ';' | AND asignar ;
asignar_valor 
    :
    asignar_valor  ',' asignar
    |SET asignar
    ;
asignar 
    : asignar NAMEV '=' dato 
    | NAMEV '=' dato
    ;
/*declaracion de variables*/
declarar 
    : 
    DECLARE secuencia_nombres AS tipo_atributo 
    ;
secuencia_nombres 
    :secuencia_nombres ','  NAMEV
    |NAMEV
    ;
asignar 
    : '=' dato ';'
    | ';' 
    ;
/*asignar datos a la tabla*/
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
    TABLE_NAME '(' atributo_tabla ')' 
    ;
atributo_tabla 
    : 
    atributo_tabla ','  nombre_atributo tipo_atributo 
    |nombre_atributo tipo_atributo
    ;
nombre_atributo : PROPERTY_NAME | TABLE_NAME;
/*listado atributo*/
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
    |p OR p
    |TRUE
    |FALSE
    |e
    |NAMEV
    ;
o_p 
    : o_p '+' o_p 
    | o_p '-' o_p
        {$$ = $1 - $3;}
    | o_p '*' o_p
        {$$ = $1 * $3;}
    | o_p '/' o_p
        {$$ = $1 / $3;}
    | o_p '!'
        {{
          $$ = (function fact(n) { 
	    return n == 0 ? 1 : fact(n - 1) * n; 
	  })($1);
        }}
    | '-' o_p                 %prec UMINUS
        {$$ = -$2;}
    | '(' o_p ')'
        {$$ = $2;}
    |o_p OR o_p
    |o_p AND o_p
        |o_p '!=' o_p
    |o_p '==' o_p
    |o_p '<' o_p
    |o_p '>' o_p
    |o_p '<=' o_p
    |o_p '>=' o_p
    |o_p '||' o_p
    |o_p '&&' o_p
    |o_p '<>' o_p

        | NUM
        {$$ = Number(yytext);}
        |NAMEV
    | TRUE
    | nombre_atributo
    | FALSE
    | TEXT
    ;