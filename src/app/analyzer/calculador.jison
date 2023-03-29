
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
\"[^\"]*\"                          {/* console.log('<STRING>'+yytext);  */   return 'TEXT'; }
"true"                              {return 'TRUE';}
"false"                             {return 'FALSE';}
[0-9]+("."[0-9]+)?\b                {return 'NUM';}
"@"{ID}                             {return 'NAMEV'}
"DECLARE"                           {return 'DECLARE'}
"AS"                                {return 'AS'}
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

expressions
    : acciones EOF
    | EOF
    ;
acciones 
    : acciones realizar
    |realizar
    ;
realizar 
    : asignar_informacion_tabla ';'   
    | tabla {return $$;}
    | declarar
    ;
declarar 
    : 
    DECLARE NAMEV AS tipo_atributo 
    ;
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
    e
    |p
    |TEXT
    ;
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
    ;

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
    ;