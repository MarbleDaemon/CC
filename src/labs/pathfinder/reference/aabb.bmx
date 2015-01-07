Type aabb
	
	Global walls:TList=CreateList()
	Global navs:TList=CreateList()
	Global holes:TList=CreateList()
	
	Field x#,y#
	Field a#,b#
	Field w#,h#
	Field kind
	
	Field cr#,cg#,cb#
	
	Field center_waypoint:waypoint
	
	Function draw_aabbs()
		For ab:aabb=EachIn walls

			SetColor ab.cr,ab.cg,ab.cb
			DrawRect ab.x,ab.y,ab.w,ab.h
		Next
		SetColor 255,255,255
	End Function
	
	Function can_put_point(x_#,y_#)
		For ab:aabb=EachIn walls
			If point_in_rect(x_,y_,ab.x,ab.y,ab.a,ab.b) Return False
		Next
		Return True
	End Function
	
	Function get_at_position:waypoint(x_#,y_#)
		For ab:aabb=EachIn navs
			If point_in_rect(x_,y_,ab.x,ab.y,ab.a,ab.b)
				Return ab.center_waypoint
			End If
		Next
		Return Null
	End Function
	
	Function draw_nav()
		For ab:aabb=EachIn navs
			SetColor 50,50,70
			DrawRect ab.x,ab.y,ab.w,ab.h
			SetColor 20,20,40
			DrawRect ab.x+1,ab.y+1,ab.w-2,ab.h-2
		Next
	End Function
	
	Function make_holes()
		For n:aabb=EachIn navs
			For w:aabb=EachIn walls
				If aabb_overlap_aabb(n,w,2) 
					ListAddLast holes,n
					ListRemove navs,n
				End If
			Next
		Next
	End Function
	
	Function point_see_point(sx#,sy#,ex#,ey#)
		For ab:aabb=EachIn walls
			If line_to_box_intersection.test(sx,sy,ex,ey,ab.x,ab.y,ab.a,ab.b) Return False
		Next
		Return True
	End Function
	
End Type


Function create_aabb:aabb(x#,y#,a#,b#,lst:TList=Null)
	Local ab:aabb=New aabb
	ab.x=x
	ab.y=y
	ab.a=x+a
	ab.b=y+b
	ab.w=a
	ab.h=b

	Local p=Rnd(100)
	ab.cr=220-p
	ab.cg=220-p
	ab.cb=250-p
			
	If lst<>Null ListAddLast lst,ab
	Return ab
End Function

