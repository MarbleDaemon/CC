@echo off
cd D:\Projects\Banners\CC
..\Builders\nodejs\node.exe assemble.js
java -jar ..\Builders/compiler.jar deps.js --js build\assembled.js --js_output_file output/Core.js --compilation_level ADVANCED_OPTIMIZATIONS --use_types_for_optimization --warning_level VERBOSE