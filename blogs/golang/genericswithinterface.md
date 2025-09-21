---
title: 在ingerface中使用泛型，实现链式方法
date: 2022-09-26 23:15:01
tags:
    - golang
    - generics
categories:
    - golang
---


```go

package main

import "fmt"

type Common struct {
	Name string
}

type ProjectInterface[T any] interface {
	Init() T
	Func1() T
}

type ProjectStruct struct {
	Name string
}

func (p ProjectStruct) Init() ProjectStruct {
	// 返回深拷贝，而不是指针
	return ProjectStruct{Name: p.Name}
}

func (p ProjectStruct) Func1() ProjectStruct {
	// 返回深拷贝，而不是指针
	return ProjectStruct{Name: p.Name}
}

func Test() {
	project := ProjectStruct{Name: "I am Project"}.Init().Func1()
	fmt.Println(project)
}


```
