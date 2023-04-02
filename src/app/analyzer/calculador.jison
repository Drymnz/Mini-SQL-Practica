
/* description: Parses and executes mathematical expressions. */
/* lexical grammar */
%{
    function printText(yytext) {
    console.log(yytext);
  }
%}
%lex
ID          [a-zA-Z]([a-zA-Z0-9])+
%%
[#][^\n]*\n   	                        {}
[-][-][^\n]*\n   	                        {}
\s+                   /* skip whitespace */
\f+   					                {}
\n+   					                {}
\r+   					                {}
\v+   					                {}
(\"[^\"]*\"|['][^']*['])                {printText(yytext+'  TEXT');return 'TEXT'; }
"true"                                  {printText(yytext+'  TRUE');return 'TRUE';}
"false"                                 {printText(yytext+'  FALSE');return 'FALSE';}
[0-9]+("."[0-9]+)?\b                    {printText(yytext+'  NUM');return 'NUM';}
"@"{ID}                                 {printText(yytext+'  NAMEV');return 'NAMEV'}
"DECLARE"                               {printText(yytext+'  DECLARE');return 'DECLARE'}
"AS"                                    {printText(yytext+'  AS');return 'AS'}
"SET"                                   {printText(yytext+'  SET');return 'SET'}
"AND"                                   {printText(yytext+'  AND');return 'AND'}
"OR"                                    {printText(yytext+'  OR');return 'OR'}
"NOT"                                   {printText(yytext+'  NOT');return 'NOT'}
"INPUT"                                 {printText(yytext+'  INPUT');return 'INPUT'}
"PRINT"                                 {printText(yytext+'  PRINT');return 'PRINT'}

"IF"                                    {printText(yytext+'  IF');return 'IF'}
"THEN"                                  {printText(yytext+'  THEN');return 'THEN'}
"END"                                   {printText(yytext+'  END');return 'END'}
"END"                                   {printText(yytext+'  END');return 'END'}
"ELSE"                                  {printText(yytext+'  ELSE');return 'ELSE'}
"ELSEIF"                                 {printText(yytext+'  ELSEIF');return 'ELSEIF'}

"SELECT"                                {printText(yytext+'  SELECT');return 'SELECT'}
"FROM"                                  {printText(yytext+'  FROM');return 'FROM'}
"WHERE"                                 {printText(yytext+'  WHERE');return 'WHERE'}
"LIMIT"                                 {printText(yytext+'  LIMIT');return 'LIMIT'}
"OFFSET"                                {printText(yytext+'  OFFSET');return 'OFFSET'}
/*ARITMETICAS*/
"INT"                                   {printText(yytext+'  INT');return 'INT';}
"STRING"                                {printText(yytext+'  STRING');return 'STRING';}
"TEXT"                                  {printText(yytext+'  TEX');return 'TEX';}
"DECIMAL"                               {printText(yytext+'  DECIMAL');return 'DECIMAL';}
"BOOLEAN"                               {printText(yytext+'  BOOLEAN');return 'BOOLEAN';}
/*ARITMETICAS*/
"*"                                     {printText(yytext+'  *');return '*';}
"/"                                     {printText(yytext+'  /');return '/';}
"-"                                     {printText(yytext+'  -');return '-';}
"+"                                     {printText(yytext+'  +');return '+';}
/*RELACIONAL*/
"!="                                    {printText(yytext+'  !=');return '!=';}
"=="                                    {printText(yytext+'  ==');return '==';}
"<="                                    {printText(yytext+'  <=');return '<=';}
">="                                    {printText(yytext+'  >=');return '>=';}
"<>"                                    {printText(yytext+'  <>');return '<>';}
"<"                                     {printText(yytext+'  <');return '<';}
">"                                     {printText(yytext+'  >');return '>';}
"!"                                     {printText(yytext+'  !');return '!';}
"||"                                    {printText(yytext+'  ||');return '||';}
"&&"                                    {printText(yytext+'  &&');return '&&';}
/*AGRUPACION*/
"("                                     {printText(yytext+'  (');return '(';}
")"                                     {printText(yytext+'  )');return ')';}
/*OTROS*/
";"                                     {printText(yytext+'  ;');return ';';}
","                                     {printText(yytext+'  ,');return ',';}
"="                                     {printText(yytext+'  =');return '=';}
/*TOKEN COMPLEJOS*/
[a-zA-Z][a-zA-Z0-9]+([_]+[a-zA-Z0-9]+)+ {printText(yytext+'  PROPERTY_NAME');return 'PROPERTY_NAME'}
{ID}                                    {printText(yytext+'  TABLE_NAME');return 'TABLE_NAME'}
<<EOF>>                                 {printText(yytext+'  EOF');return 'EOF';}
.                                       {printText(yytext+'  INVALID');return 'INVALID';}

/lex

/* operator associations and precedence */
%left UMINU
%left '!'
%left '&&'
%left '||' 
%left OR AND NOT
%left '==' '!=' '<' '<=' '>' '>=' '<>' '='
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
 /*CREAR TABLA*/
    :tabla e_p_c 
     /*ASIGNA NUEVO ELEMENTO A TABLA*/
    | asignar_informacion_tabla e_p_c
    /*IMPRIMIR*/
    | imprimir e_p_c
    /*DECLARAR VARIABLE*/
    | declarar asignar 
    /*ASIGNAR VALOR*/
    | asignar_valor  e_p_c
    /*if*/
    | if END IF e_p_c 
     /*SELECT*/
    | select e_p_c
    ;
/*MANEJO DE ERRORES SINTACTICO*/
e_p_c : ';'  | ERROR ; //error te falta ;
e_f_t : FROM | ERROR;   //te falto el from
e_t_f : THEN |  ERROR;  //te falta if indicar then
e_d   : dato |  ERROR;  //te falto indicar la asignacion
e_c_s : col_todo |  ERROR;  //te falto indicar que columna
e_a_c_t: atributo_tabla |  ERROR; //te falta atributos a la tabla
e_f_t_t: tipo_atributo |  ERROR;    //falta tipo en atributo de tabla
/*SELECT*/

select : SELECT e_c_s e_f_t nombre_atributo s_f ;

s_f
    :v_f
    |
    ;

v_f
    : v_f  tipjo_filtro
    | tipjo_filtro
    ;

tipjo_filtro
    : WHERE  e_d 
    | LIMIT e_d 
    | OFFSET e_d 
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
    : PROPERTY_NAME
    | TABLE_NAME
    | NAMEV
    ;
nombre_serie 
    :nombre_serie ',' nombre_atributo
    |nombre_atributo
    ;
/*IF*/

if : IF e_d e_t_f  acciones final_if  ;

final_if 
    :
    ELSE acciones 
    | ELSEIF e_d e_t_f acciones final_if
    | 
    ;

/*ASIGNAR VALOR*/

asignar_valor  : SET asignar ;

asignar 
    : asignar ',' NAMEV '=' e_d 
    | NAMEV '=' e_d
    ;

/*DECLARAR VARIABLE*/

declarar : DECLARE secuencia_nombres AS tipo_atributo ;

secuencia_nombres 
    :secuencia_nombres ','  NAMEV
    |NAMEV
    ;

asignar 
    : '=' e_d e_p_c
    | e_p_c 
    ;

/*IMPRIMIR*/

imprimir : PRINT '(' dato_secuencia ')' ;

dato_secuencia 
    :dato_secuencia ',' e_d 
    | e_d
    ; 
    

/*ASIGNA NUEVO ELEMENTO A TABLA*/

asignar_informacion_tabla 
    :
    asignar_informacion_tabla ','  nombre_atributo '=' e_d 
    |nombre_atributo '=' e_d 
    ; 
/*CREAR TABLA*/

tabla : TABLE_NAME '(' e_a_c_t ')' ;

atributo_tabla 
    : 
    atributo_tabla ','  nombre_atributo e_f_t_t 
    |nombre_atributo e_f_t_t
    ;
nombre_atributo 
    : 
     PROPERTY_NAME 
    |TABLE_NAME
    ;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*listado atributo*/
tipo_atributo
    :
    INT
    |STRING
    |DECIMAL
    |BOOLEAN
    |TEX
    ;
/*OPERACIONES*/
dato : e ;
e
    /*OPERACION MATEMATICA*/
    : e '+' e {$$ = $1 + $3;}
    | e '-' e {$$ = $1 - $3;}
    | e '*' e {$$ = $1 * $3;}
    | e '/' e {$$ = $1 / $3;}
    | '-' e   %prec UMINUS {$$ = -$2;}
    | '(' e ')' {$$ = $2;}
    /*OPERACION RELACIONAL*/
    | e '==' e 
    | e '!=' e 
    | e '<' e 
    | e '<=' e 
    | e '>' e 
    | e '>=' e 
    | e '<>' e 
    | e OR e 
    | e AND e 
    | e '||' e 
    | e '&&' e 
    | '!' e 
    | NOT e
    /*DATOS A OPERAR*/
    | NUM {$$ = Number(yytext);}
    | INPUT '(' TEXT ')' 
    | TEXT 
    | u_v
    | FALSE
    | TRUE
    ;
    
u_v  : serie  a_v ;
a_v
    : '=' e
    |
    ;