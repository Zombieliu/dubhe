// Define module
// target_namespace means the name exported to JS, could be same as which in other modules
// editor_support at the last means the suffix of binding function name, different modules should use unique name
// Note: doesn't support number prefix
%module(target_namespace="middleware") editor_support

// Disable some swig warnings, find warning number reference here ( https://www.swig.org/Doc4.1/Warnings.html )
#pragma SWIG nowarn=503,302,401,317,402

// Insert code at the beginning of generated header file (.h)
%insert(header_file) %{
#pragma once
#include "bindings/jswrapper/SeApi.h"
#include "bindings/manual/jsb_conversions.h"
#include "editor-support/middleware-adapter.h"
#include "editor-support/MiddlewareManager.h"
#include "editor-support/SharedBufferManager.h"

%}

// Insert code at the beginning of generated source file (.cpp)
%{
#include "bindings/auto/jsb_editor_support_auto.h"
%}

// ----- Ignore Section Begin ------
// Brief: Classes, methods or attributes need to be ignored
//
// Usage:
//
//  %ignore your_namespace::your_class_name;
//  %ignore your_namespace::your_class_name::your_method_name;
//  %ignore your_namespace::your_class_name::your_attribute_name;
//
// Note: 
//  1. 'Ignore Section' should be placed before attribute definition and %import/%include
//  2. namespace is needed
//

%ignore cc::middleware::MiddlewareManager::addTimer;
%ignore cc::middleware::MiddlewareManager::removeTimer;
%ignore cc::middleware::MiddlewareManager::getMeshBuffer;

%ignore cc::middleware::SharedBufferManager::getBuffer;
%ignore cc::middleware::SharedBufferManager::reset;

%ignore cc::middleware::Texture2D::setTexParameters;

%ignore cc::middleware::MeshBuffer::getUIMeshBuffer;
%ignore cc::middleware::MeshBuffer::uiMeshBuffers;

%ignore cc::middleware::Color4B;
%ignore cc::middleware::Color4F;
%ignore cc::middleware::Tex2F;
%ignore cc::middleware::V3F_T2F_C4B;
%ignore cc::middleware::V3F_T2F_C4B_C4B;
%ignore cc::middleware::Triangles;
%ignore cc::middleware::TwoColorTriangles;
%ignore cc::middleware::Texture2D::TexParams;
%ignore cc::middleware::IMiddleware;

// ----- Rename Section ------
// Brief: Classes, methods or attributes needs to be renamed
//
// Usage:
//
//  %rename(rename_to_name) your_namespace::original_class_name;
//  %rename(rename_to_name) your_namespace::original_class_name::method_name;
//  %rename(rename_to_name) your_namespace::original_class_name::attribute_name;
// 
// Note:
//  1. 'Rename Section' should be placed before attribute definition and %import/%include
//  2. namespace is needed



// ----- Module Macro Section ------
// Brief: Generated code should be wrapped inside a macro
// Usage:
//  1. Configure for class
//    %module_macro(CC_USE_GEOMETRY_RENDERER) cc::pipeline::GeometryRenderer;
//  2. Configure for member function or attribute
//    %module_macro(CC_USE_GEOMETRY_RENDERER) cc::pipeline::RenderPipeline::geometryRenderer;
// Note: Should be placed before 'Attribute Section'

// Write your code bellow



// ----- Attribute Section ------
// Brief: Define attributes ( JS properties with getter and setter )
// Usage:
//  1. Define an attribute without setter
//    %attribute(your_namespace::your_class_name, cpp_member_variable_type, js_property_name, cpp_getter_name)
//  2. Define an attribute with getter and setter
//    %attribute(your_namespace::your_class_name, cpp_member_variable_type, js_property_name, cpp_getter_name, cpp_setter_name)
//  3. Define an attribute without getter
//    %attribute_writeonly(your_namespace::your_class_name, cpp_member_variable_type, js_property_name, cpp_setter_name)
//
// Note:
//  1. Don't need to add 'const' prefix for cpp_member_variable_type 
//  2. The return type of getter should keep the same as the type of setter's parameter
//  3. If using reference, add '&' suffix for cpp_member_variable_type to avoid generated code using value assignment
//  4. 'Attribute Section' should be placed before 'Import Section' and 'Include Section'
//



// ----- Import Section ------
// Brief: Import header files which are depended by 'Include Section'
// Note: 
//   %import "your_header_file.h" will not generate code for that header file
//
%import "editor-support/MiddlewareMacro.h"
%import "editor-support/MeshBuffer.h"



// ----- Include Section ------
// Brief: Include header files in which classes and methods will be bound
%include "editor-support/middleware-adapter.h"
%include "editor-support/SharedBufferManager.h"
%include "editor-support/MiddlewareManager.h"
