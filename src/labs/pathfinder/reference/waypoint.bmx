Type link
	
	Field target:waypoint
	Field length#
	
End Type

Type waypoint

	Global waypoints:TList=CreateList()
	Global waypoints_arr:waypoint[]
	
	Field x#,y#
	
	Field links:TList=New TList
	Field links_arr:link[]
	
	Field opened
	Field closed
	
	Field g#
	Field h#
	Field f#
	
	Field prev:waypoint
		
	Function draw_waypoints()
		SetColor 200,250,200
		For wp:waypoint=EachIn waypoints
			DrawRect wp.x-2,wp.y-2,4,4
		Next
		SetColor 255,255,255
	End Function
	
	Function get_nearest:waypoint(x_#,y_#)
		Local dist#=9999999
		Local res:waypoint
		For wp:waypoint=EachIn waypoints
			Local dst#=distance(x_,y_,wp.x,wp.y)
			If dst<dist
				dist=dst
				res=wp
			End If
		Next
		Return res
	End Function
	
	Function reset()
		If waypoints_arr=Null
			waypoints_arr=waypoint[]ListToArray(waypoints)
		End If
		'For wp:waypoint=EachIn waypoints
		For i=0 To waypoints_arr.length-1
			Local wp:waypoint=waypoints_arr[i]
			wp.closed=False
			wp.opened=False
			wp.prev=Null
			wp.g=999999
			wp.f=999999
			wp.h=999999
		Next
	End Function
	
	' A*
	Function find_path:TList(start:waypoint,finish:waypoint)
		
		Local ms=MilliSecs()
		
		Local res:TList=CreateList()
		
		reset
		
		Local opened:TList=CreateList()
		
		start.g=0
		start.h=distance(start.x,start.y,finish.x,finish.y)
		start.f=h
		
		ListAddLast opened,start
		start.opened=True
		
		While CountList(opened)>0
			
			Local dist#=999999
			Local cur:waypoint
			
			For w:waypoint=EachIn opened
				If w.f<dist
					cur=w
					dist=w.f
				End If
			Next
			
			If cur=finish
				While cur<>Null
					ListAddFirst res,cur
					cur=cur.prev
				Wend
				
				'Print "search time: "+(MilliSecs()-ms)+" ms"
				Return res
			End If
			
			
			ListRemove opened,cur
			cur.closed=True
			cur.opened=False
			
			'For l:link=EachIn cur.links
			For j=0 To cur.links_arr.length-1	
				l:link=cur.links_arr[j]
				If Not l.target.closed

					Local tentative_g_score#=cur.g+l.length
					Local tentative_is_better = False
					
					If l.target.opened=False
						
						ListAddLast opened,l.target
						l.target.opened=True
						l.target.closed=False
						tentative_is_better = True
					
					Else
					
						If tentative_g_score < l.target.g
							tentative_is_better = True
						End If  
					
					End If
					
					
					If tentative_is_better
						
						l.target.prev=cur
						l.target.g=tentative_g_score
						l.target.h=distance(l.target.x,l.target.y,finish.x,finish.y)
						l.target.f=l.target.h+l.target.g
						
					End If
				
				End If
				
			Next
			
		Wend
		
		'Print "search time: "+(MilliSecs()-ms)+" ms"
		cur=finish
		While cur<>Null
			ListAddFirst res,cur
			cur=cur.prev
		Wend
		
		Return res
				
	End Function
	
	Method calculate_links()
		ClearList links
		For j=0 To waypoints_arr.length-1
			Local wwp:waypoint=waypoints_arr[j]
			If Self<>wwp
				
				If aabb.point_see_point(x,y,wwp.x,wwp.y)
					
					Local l:link
					
					l=New link
					l.target=wwp
					l.length=distance(x,y,wwp.x,wwp.y)
					
					ListAddLast links,l
					
				End If
				
			End If
		Next
		links_arr=link[](ListToArray(links))
	End Method
	
	Function build_links()

		waypoints_arr=waypoint[](ListToArray(waypoints))

		For i=0 To waypoints_arr.length-1
			waypoints_arr[i].calculate_links()
		Next

	End Function
	
End Type

Function create_waypoint:waypoint(x#,y#)
	
	If Not aabb.can_put_point(x,y) Return
	
	Local wp:waypoint
	
	For wp=EachIn waypoint.waypoints
		If wp.x=x And wp.y=y Return wp
	Next
	
	wp=New waypoint
	wp.x=x
	wp.y=y
	ListAddLast waypoint.waypoints,wp
	Return wp
End Function

Function create_free_waypoint:waypoint(x#,y#)
	
	Local wp:waypoint
	
	wp=New waypoint
	wp.x=x
	wp.y=y
	Return wp

End Function

